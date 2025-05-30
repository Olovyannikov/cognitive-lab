function serialize(o) {
    return typeof o == 'string' ? `'${o}'` : new c().serialize(o);
}
const c = /* @__PURE__ */ (function () {
    class o {
        #t = new Map();
        compare(t, r$1) {
            const e = typeof t,
                n = typeof r$1;
            return e === 'string' && n === 'string'
                ? t.localeCompare(r$1)
                : e === 'number' && n === 'number'
                  ? t - r$1
                  : String.prototype.localeCompare.call(this.serialize(t, true), this.serialize(r$1, true));
        }
        serialize(t, r$1) {
            if (t === null) return 'null';
            switch (typeof t) {
                case 'string':
                    return r$1 ? t : `'${t}'`;
                case 'bigint':
                    return `${t}n`;
                case 'object':
                    return this.$object(t);
                case 'function':
                    return this.$function(t);
            }
            return String(t);
        }
        serializeObject(t) {
            const r$1 = Object.prototype.toString.call(t);
            if (r$1 !== '[object Object]')
                return this.serializeBuiltInType(r$1.length < 10 ? `unknown:${r$1}` : r$1.slice(8, -1), t);
            const e = t.constructor,
                n = e === Object || e === void 0 ? '' : e.name;
            if (n !== '' && globalThis[n] === e) return this.serializeBuiltInType(n, t);
            if (typeof t.toJSON == 'function') {
                const i = t.toJSON();
                return n + (i !== null && typeof i == 'object' ? this.$object(i) : `(${this.serialize(i)})`);
            }
            return this.serializeObjectEntries(n, Object.entries(t));
        }
        serializeBuiltInType(t, r$1) {
            const e = this['$' + t];
            if (e) return e.call(this, r$1);
            if (typeof r$1?.entries == 'function') return this.serializeObjectEntries(t, r$1.entries());
            throw new Error(`Cannot serialize ${t}`);
        }
        serializeObjectEntries(t, r$1) {
            const e = Array.from(r$1).sort((i, a) => this.compare(i[0], a[0]));
            let n = `${t}{`;
            for (let i = 0; i < e.length; i++) {
                const [a, l$1] = e[i];
                (n += `${this.serialize(a, true)}:${this.serialize(l$1)}`), i < e.length - 1 && (n += ',');
            }
            return n + '}';
        }
        $object(t) {
            let r$1 = this.#t.get(t);
            return (
                r$1 === void 0 &&
                    (this.#t.set(t, `#${this.#t.size}`), (r$1 = this.serializeObject(t)), this.#t.set(t, r$1)),
                r$1
            );
        }
        $function(t) {
            const r$1 = Function.prototype.toString.call(t);
            return r$1.slice(-15) === '[native code] }'
                ? `${t.name || ''}()[native]`
                : `${t.name}(${t.length})${r$1.replace(/\s*\n\s*/g, '')}`;
        }
        $Array(t) {
            let r$1 = '[';
            for (let e = 0; e < t.length; e++) (r$1 += this.serialize(t[e])), e < t.length - 1 && (r$1 += ',');
            return r$1 + ']';
        }
        $Date(t) {
            try {
                return `Date(${t.toISOString()})`;
            } catch {
                return 'Date(null)';
            }
        }
        $ArrayBuffer(t) {
            return `ArrayBuffer[${new Uint8Array(t).join(',')}]`;
        }
        $Set(t) {
            return `Set${this.$Array(Array.from(t).sort((r$1, e) => this.compare(r$1, e)))}`;
        }
        $Map(t) {
            return this.serializeObjectEntries('Map', t.entries());
        }
    }
    for (const s of ['Error', 'RegExp', 'URL'])
        o.prototype['$' + s] = function (t) {
            return `${s}(${t})`;
        };
    for (const s of [
        'Int8Array',
        'Uint8Array',
        'Uint8ClampedArray',
        'Int16Array',
        'Uint16Array',
        'Int32Array',
        'Uint32Array',
        'Float32Array',
        'Float64Array',
    ])
        o.prototype['$' + s] = function (t) {
            return `${s}[${t.join(',')}]`;
        };
    for (const s of ['BigInt64Array', 'BigUint64Array'])
        o.prototype['$' + s] = function (t) {
            return `${s}[${t.join('n,')}${t.length > 0 ? 'n' : ''}]`;
        };
    return o;
})();
const z = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225],
    R = [
        1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216,
        310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488,
        -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479,
        -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817,
        -965641998,
    ],
    S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
    r = [];
var k = class {
    _data = new l();
    _hash = new l([...z]);
    _nDataBytes = 0;
    _minBufferSize = 0;
    finalize(e) {
        e && this._append(e);
        const s = this._nDataBytes * 8,
            t = this._data.sigBytes * 8;
        return (
            (this._data.words[t >>> 5] |= 128 << (24 - (t % 32))),
            (this._data.words[(((t + 64) >>> 9) << 4) + 14] = Math.floor(s / 4294967296)),
            (this._data.words[(((t + 64) >>> 9) << 4) + 15] = s),
            (this._data.sigBytes = this._data.words.length * 4),
            this._process(),
            this._hash
        );
    }
    _doProcessBlock(e, s) {
        const t = this._hash.words;
        let i = t[0],
            o = t[1],
            a = t[2],
            c$1 = t[3],
            h = t[4],
            g = t[5],
            f = t[6],
            y = t[7];
        for (let n = 0; n < 64; n++) {
            if (n < 16) r[n] = e[s + n] | 0;
            else {
                const d = r[n - 15],
                    j = ((d << 25) | (d >>> 7)) ^ ((d << 14) | (d >>> 18)) ^ (d >>> 3),
                    B = r[n - 2],
                    x = ((B << 15) | (B >>> 17)) ^ ((B << 13) | (B >>> 19)) ^ (B >>> 10);
                r[n] = j + r[n - 7] + x + r[n - 16];
            }
            const m = (h & g) ^ (~h & f),
                p = (i & o) ^ (i & a) ^ (o & a),
                u = ((i << 30) | (i >>> 2)) ^ ((i << 19) | (i >>> 13)) ^ ((i << 10) | (i >>> 22)),
                b = ((h << 26) | (h >>> 6)) ^ ((h << 21) | (h >>> 11)) ^ ((h << 7) | (h >>> 25)),
                w = y + b + m + R[n] + r[n],
                M = u + p;
            (y = f), (f = g), (g = h), (h = (c$1 + w) | 0), (c$1 = a), (a = o), (o = i), (i = (w + M) | 0);
        }
        (t[0] = (t[0] + i) | 0),
            (t[1] = (t[1] + o) | 0),
            (t[2] = (t[2] + a) | 0),
            (t[3] = (t[3] + c$1) | 0),
            (t[4] = (t[4] + h) | 0),
            (t[5] = (t[5] + g) | 0),
            (t[6] = (t[6] + f) | 0),
            (t[7] = (t[7] + y) | 0);
    }
    _append(e) {
        typeof e == 'string' && (e = l.fromUtf8(e)), this._data.concat(e), (this._nDataBytes += e.sigBytes);
    }
    _process(e) {
        let s,
            t = this._data.sigBytes / 64;
        e ? (t = Math.ceil(t)) : (t = Math.max((t | 0) - this._minBufferSize, 0));
        const i = t * 16,
            o = Math.min(i * 4, this._data.sigBytes);
        if (i) {
            for (let a = 0; a < i; a += 16) this._doProcessBlock(this._data.words, a);
            (s = this._data.words.splice(0, i)), (this._data.sigBytes -= o);
        }
        return new l(s, o);
    }
};
var l = class l {
    words;
    sigBytes;
    constructor(e, s) {
        (e = this.words = e || []), (this.sigBytes = s === void 0 ? e.length * 4 : s);
    }
    static fromUtf8(e) {
        const s = unescape(encodeURIComponent(e)),
            t = s.length,
            i = [];
        for (let o = 0; o < t; o++) i[o >>> 2] |= (s.charCodeAt(o) & 255) << (24 - (o % 4) * 8);
        return new l(i, t);
    }
    toBase64() {
        const e = [];
        for (let s = 0; s < this.sigBytes; s += 3) {
            const t = (this.words[s >>> 2] >>> (24 - (s % 4) * 8)) & 255,
                i = (this.words[(s + 1) >>> 2] >>> (24 - ((s + 1) % 4) * 8)) & 255,
                o = (this.words[(s + 2) >>> 2] >>> (24 - ((s + 2) % 4) * 8)) & 255,
                a = (t << 16) | (i << 8) | o;
            for (let c$1 = 0; c$1 < 4 && s * 8 + c$1 * 6 < this.sigBytes * 8; c$1++)
                e.push(S.charAt((a >>> (6 * (3 - c$1))) & 63));
        }
        return e.join('');
    }
    concat(e) {
        if (
            ((this.words[this.sigBytes >>> 2] &= 4294967295 << (32 - (this.sigBytes % 4) * 8)),
            (this.words.length = Math.ceil(this.sigBytes / 4)),
            this.sigBytes % 4)
        )
            for (let s = 0; s < e.sigBytes; s++) {
                const t = (e.words[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
                this.words[(this.sigBytes + s) >>> 2] |= t << (24 - ((this.sigBytes + s) % 4) * 8);
            }
        else for (let s = 0; s < e.sigBytes; s += 4) this.words[(this.sigBytes + s) >>> 2] = e.words[s >>> 2];
        this.sigBytes += e.sigBytes;
    }
};
function digest(_) {
    return new k().finalize(_).toBase64();
}
function hash(input) {
    return digest(serialize(input));
}
export { hash };
