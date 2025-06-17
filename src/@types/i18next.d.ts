import resources from "./../i18n/locales/index.ts";

declare module "i18next" {
	interface CustomTypeOptions {
		resources: (typeof resources)["en"];
	}
}