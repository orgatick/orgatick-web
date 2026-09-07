import OrgatickLogo from "@orgatick/ui/assets/logo/orgatick-logo";

function Header() {
  return (
    <div className="flex items-center gap-2 text-3xl">
      <OrgatickLogo className="h-12 w-12" />
      <p className="font-bold tracking-wide">Orgatick</p>
      <p className="font-light">Account</p>
    </div>
  );
}

export default Header;
