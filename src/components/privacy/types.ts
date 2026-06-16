export type PrivacySection = {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  contact?: boolean;
};

export type PrivacyPolicyContent = {
  appName: string;
  packageId?: string;
  effectiveDate: string;
  summary: string;
  supportEmail: string;
  footerTagline: string;
  sections: readonly PrivacySection[];
  metaTitle: string;
  metaDescription: string;
};
