import InfoTeamLogo from '../../../assets/logo.svg?react';
import InfoTeamTextLogo from '../../../assets/text-logo.svg?react';

export function Logo() {
  return (
    <div className={`flex flex-col justify-center items-center`}>
      <InfoTeamLogo />
      <InfoTeamTextLogo />
    </div>
  );
}
