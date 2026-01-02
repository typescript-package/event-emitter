
<a href="https://www.typescriptlang.org/">
  <img
    src="https://raw.githubusercontent.com/typescript-package/core/refs/heads/main/ts-package-barcode-logo-512.png"
    width="20%"
    title="@typescript-package/event-emitter - A lightweight TypeScript package for event emitter."
  />
</a>

## @typescript-package/event-emitter

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

A **lightweight** TypeScript package for event emitter.

## Table of contents

- [Installation](#installation)
- [Api](#api)
  - Abstract
    - [`EventEmitterBase`](#eventemitterbase)
    - [`NamedEventEmitterBase`](#namedeventemitterbase)
  - Concrete
    - [`EventEmitter`](#eventemitter)
    - [`NamedEventEmitter`](#namedeventemitter)
- [Contributing](#contributing)
- [Code of Conduct](code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)

## Installation

```bash
npm install @typescript-package/event-emitter --save-peer
```

## Api

```typescript
import {
  // Abstract.
  EventEmitterBase,
  NamedEventEmitterBase,
  // Concrete.
  EventEmitter,
  NamedEventEmitter,
} from '@typescript-package/event-emitter';
```

## Abstract

### `EventEmitterBase`

The base abstraction class for an event emitter pattern.

```typescript
import { EventEmitter } from '@typescript-package/event-emitter';
```

[`EventEmitterBase`](https://github.com/typescript-package/event-emitter/blob/main/src/lib/event-emitter.base.ts)

### `NamedEventEmitterBase`

A base abstraction class that implements a named event emitter pattern.

```typescript
import { NamedEventEmitterBase } from '@typescript-package/event-emitter';
```

[`NamedEventEmitterBase`](https://github.com/typescript-package/event-emitter/blob/main/src/lib/named-event-emitter.base.ts)

## Concrete

### `EventEmitter`

A concrete class that implements an event emitter pattern.

```typescript
import { EventEmitter } from '@typescript-package/event-emitter';

const eventEmitter = new EventEmitter({
  // adapter: ListenersSetAdapter,
  async: false
});

eventEmitter.on((msg) => console.log(`Received: ${msg}`));
eventEmitter.emit('Hello, World!');

```

[`EventEmitter`](https://github.com/typescript-package/event-emitter/blob/main/src/lib/event-emitter.class.ts)

### `NamedEventEmitter`

A concrete class that implements a named event emitter pattern.

```typescript
import { NamedEventEmitter } from '@typescript-package/event-emitter';

const eventEmitter = new NamedEventEmitter({async: false}, {
  'event1': [(msg: string) => {
    console.log(`Listener 1: ${msg}`);
  }],
  'event2': [(num: number) => {
    console.log(`Event 2 received number: ${num}`);
  }]
});

eventEmitter.clear('event1')
eventEmitter.on('event1', (msg: string) => {
  console.log(`Listener 2: ${msg}`);
});

eventEmitter.on('event2', (num: number) => {
  console.log(`Event 2 received number: ${num}`);
});

eventEmitter.emit('event1', 'Hello, World!');
eventEmitter.listeners('event1')?.forEach(listener => {
  listener('Hello, World!');
});
```

[`NamedEventEmitter`](https://github.com/typescript-package/event-emitter/blob/main/src/lib/named-event-emitter.class.ts)

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

- [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
- [Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)
- [GitHub](https://github.com/sponsors/angular-package/sponsorships?sponsor=sciborrudnicki&tier_id=83618)
- [DonorBox](https://donorbox.org/become-a-sponsor-to-the-angular-package?default_interval=o)
- [Patreon](https://www.patreon.com/checkout/angularpackage?rid=0&fan_landing=true&view_as=public)

or via Trust Wallet

- [XLM](https://link.trustwallet.com/send?coin=148&address=GAFFFB7H3LG42O6JA63FJDRK4PP4JCNEOPHLGLLFH625X2KFYQ4UYVM4)
- [USDT (BEP20)](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94&token_id=0x55d398326f99059fF775485246999027B3197955)
- [ETH](https://link.trustwallet.com/send?coin=60&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
- [BTC](https://link.trustwallet.com/send?coin=0&address=bc1qnf709336tfl57ta5mfkf4t9fndhx7agxvv9svn)
- [BNB](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)

Thanks for your support!

## Code of Conduct

By participating in this project, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

Please follow the following commit message conventions:

- [AngularJS Git Commit Message Conventions][git-commit-angular]
- [Karma Git Commit Msg][git-commit-karma]
- [Conventional Commits][git-commit-conventional]

### Versioning

The package follows [Semantic Versioning 2.0.0][git-semver] for all releases. The versioning format is:

**Given a version number MAJOR.MINOR.PATCH, increment the:**

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © typescript-package ([license][typescript-package-license])

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/event-emitter
  [isscript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/event-emitter
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/event-emitter
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/event-emitter
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/event-emitter/issues
  [typescript-package-forks]: https://github.com/typescript-package/event-emitter/network
  [typescript-package-license]: https://github.com/typescript-package/event-emitter/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/event-emitter/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/@typescript-package%2Fevent-emitter.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/@typescript-package%2Fevent-emitter

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
