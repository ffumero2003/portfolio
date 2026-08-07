import ButtonPrimary from "./buttonPrimary";

// Header link to this portfolio's own source repository.
// Change the href if the repo is renamed or moved.
export default function SiteCodeButton() {
  return (
    <a
      href="https://github.com/ffumero2003/portfolio"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ButtonPrimary text="Site Code" />
    </a>
  );
}
