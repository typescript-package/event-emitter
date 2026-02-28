
<a href="https://www.typescriptlang.org/">
  <img
    src="https://raw.githubusercontent.com/typescript-package/core/refs/heads/main/ts-package-barcode-logo-512.png"
    width="20%"
    title="@typescript-package/event-emitter - A lightweight TypeScript package for event emitter."
  />
</a>

## @typescript-package/event-emitter

[![Gitter][gitter-badge]][gitter-chat]
[![Discord][discord-badge]][discord-channel]
[![Twitter][twitter-badge]][twitter-follow]

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]

<!-- GitHub badges -->
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub forks][typescript-package-badge-forks]][typescript-package-forks]
[![GitHub stars][typescript-package-badge-stars]][typescript-package-stars]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

<!-- Sponsors -->
[![GitHub Sponsors][github-badge-sponsor]][github-sponsor-link]
[![Patreon Sponsors][patreon-badge]][patreon-link]

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
  - Type
    - [`EventListeners`](#eventlisteners)
    - [`ListenersFor`](#listenersfor)
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

### Abstract

### `EventEmitterBase`

The base abstraction class for an event emitter pattern with replaceable listeners adapter and asynchronous capabilities.

```typescript
import { EventEmitter } from '@typescript-package/event-emitter';
```

[`EventEmitterBase`](https://github.com/typescript-package/event-emitter/blob/main/src/lib/event-emitter.base.ts)

### `NamedEventEmitterBase`

A base abstraction class that implements a named event emitter pattern with replaceable listeners adapter and asynchronous capabilities.

```typescript
import { NamedEventEmitterBase } from '@typescript-package/event-emitter';
```

[`NamedEventEmitterBase`](https://github.com/typescript-package/event-emitter/blob/main/src/lib/named-event-emitter.base.ts)

### Concrete

### `EventEmitter`

A concrete class for an event emitter pattern with replaceable listeners adapter and asynchronous capabilities.

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

A concrete class that implements a named event emitter pattern with replaceable listeners adapter and asynchronous capabilities.

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

### Type

### `EventListeners`

A type representing a partial mapping of event names to their listener arrays.

```typescript
import { EventListeners } from '@typescript-package/event-emitter';
```

### `ListenersFor`

A type representing the listeners for a specific event in a named event emitter, utilizing a specified listeners adapter and supporting asynchronous capabilities.

```typescript
import { EventListeners } from '@typescript-package/event-emitter';
```

[`EventListeners`](https://github.com/typescript-package/event-emitter/blob/main/src/type/listeners-for.type.ts)

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

- [4Fund](https://4fund.com/bruubs)
- [DonorBox](https://donorbox.org/become-a-sponsor-to-the-angular-package?default_interval=o)
- [GitHub](https://github.com/sponsors/angular-package/sponsorships?sponsor=sciborrudnicki&tier_id=83618)
- [Ko-fi](https://ko-fi.com/sterblack)
- [OpenCollective](https://opencollective.com/sterblack)
- [Patreon](https://www.patreon.com/checkout/angularpackage?rid=0&fan_landing=true&view_as=public)
- [PayPal](https://paypal.me/sterblack)
- [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
- ~~[Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)~~

or via Trust Wallet

- [BNB](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
- [BTC](https://link.trustwallet.com/send?coin=0&address=bc1qnf709336tfl57ta5mfkf4t9fndhx7agxvv9svn)
- [ETH](https://link.trustwallet.com/send?coin=60&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
- [USDT (BEP20)](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94&token_id=0x55d398326f99059fF775485246999027B3197955)
- [XLM](https://link.trustwallet.com/send?coin=148&address=GAFFFB7H3LG42O6JA63FJDRK4PP4JCNEOPHLGLLFH625X2KFYQ4UYVM4)

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

## Related packages

- **[@typescript-package/collection](https://github.com/typescript-package/collection)**: A lightweight TypeScript library for data collection.
- **[@typescript-package/collection-adapter](https://github.com/typescript-package/collection-adapter)**: A TypeScript library for collection adapters.
- **[@typescript-package/data](https://github.com/typescript-package/data)**: A lightweight TypeScript library for basic data management.
- **[@typescript-package/listeners](https://github.com/typescript-package/listeners)**: A lightweight TypeScript library for managing listeners.

<!--  -->
[github-badge-sponsor]: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/angular-package
[github-sponsor-link]: https://github.com/sponsors/angular-package
[patreon-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dangularpackage%26type%3Dpatrons&style=flat
[patreon-link]: https://www.patreon.com/join/angularpackage/checkout?fan_landing=true&rid=0

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/event-emitter
  [typescript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/event-emitter
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

<!-- Discord -->
[discord-badge]: https://img.shields.io/discord/925168966098386944?style=social&logo=discord&label=Discord
[discord-channel]: https://discord.com/invite/rUCR2CW75G

<!-- Gitter -->
[gitter-badge]: https://img.shields.io/gitter/room/angular-package/ap-sass?style=social&logo=gitter
[gitter-chat]: https://app.gitter.im/#/room/#ap-sass:gitter.im

<!-- Twitter -->
[twitter-badge]: https://img.shields.io/twitter/follow/angularpackage?label=%40angularpackage&style=social
[twitter-follow]: https://twitter.com/angularpackage

<!-- GIT -->
[git-semver]: http://semver.org/
