# Effector Utils

This folder contains all the effector related utils

### `createPageInit` - `+pageInitiated.ts`

Creates page init event, used for initiating effector logic needed to prepare data for the page, works on server side.

### `createPageStart` - `+pageStarted.ts`

Creates page start event, used to start effector logic needed on client side on page start.

### `useScope`

Return current scope.

### `useScopeUpdate`

Trigger update of the current scope with the provided values.

### `getScope`

Update current scope and return new one, used internally for scope update. Implementation is taken from the official
effector/next package, to support after transitional scope updates

### `EffectorProvider`

Used for provide/update scope internally
