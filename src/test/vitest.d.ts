// Vitest 5 a ajouté un paramètre de type à `Assertion<R, T>` : l'augmentation
// livrée par @testing-library/jest-dom (Assertion<T>) ne s'applique plus.
// On branche les matchers sur `Matchers`, le point d'extension prévu par Vitest.
import "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  // Les paramètres doivent être identiques à la déclaration d'origine (T inclus).
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown>
    extends TestingLibraryMatchers<unknown, R> {}
}
