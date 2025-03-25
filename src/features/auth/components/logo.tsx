import InfoTeamLogo from '../../../assets/infoteam-logo.svg?react';
import InfoTeamTextLogo from '../../../assets/infoteam-text-logo.svg?react';

export function Logo() {
  return (
    <div className={`flex flex-col justify-center items-center h-[219px]`}>
      <InfoTeamLogo />
      <InfoTeamTextLogo />
    </div>
  );
}
