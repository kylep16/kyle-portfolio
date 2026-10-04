// Official storefront logo. A still frame respects reduced-motion preferences.
export default function Nep2uneMark() {
  return <picture className="nep2une-mark"><source media="(prefers-reduced-motion: reduce)" srcSet="/assets/nep/nep2une-logo-static.png" /><img src="/assets/nep/nep2une-logo.gif" alt="" width="200" height="113" /></picture>;
}
