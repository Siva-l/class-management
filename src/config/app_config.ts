export class AppConfig {
  static readonly PORT = process.env.PORT ?? 3000;
  static readonly DATABASE_URL = process.env.DATABASE_URL;

  static readonly APP_NAME = process.env.APP_NAME ?? 'Bloomify API';
  static readonly APP_DESCRIPTION =
    process.env.APP_DESCRIPTION ?? 'Positive news app';
  static readonly APP_VERSION = process.env.APP_VERSION ?? '0.0.1';
}
