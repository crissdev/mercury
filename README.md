# Mercury

Angular 8 application to illustrate usage of different CSS layout techniques and positioning (CSS Grid, Flexbox, Sticky positioning), OnPush change detection, Observables and how to lazy load images using IntersectionObserver.

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.1, using the following command:

```sh
ng new --enable-ivy --prefix=mcy --routing=true --style=css mercury
```

## Features

- Lazy loading of images using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- Modern responsive page and component layout using [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) and [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout).
- Angular in-memory-web-api &ndash; https://github.com/angular/in-memory-web-api
- `OnPush` change detection strategy
- Advanced usage of observables (shareReplay, switchMap, distinctUntilChanged etc.)
- [Custom DOM Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- Data management using services

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Credits

https://www.e-booksdirectory.com/ &ndash; Book information and thumbnails.
