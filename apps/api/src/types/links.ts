export type CreateLinkBody = {
  originalUrl: string;
  code?: string;
};

export type RedirectParams = {
  code: string;
};
