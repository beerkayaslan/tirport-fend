import DownAngle from './files/down-angle.svg';
import Eye from './files/eye.svg';
import EyeSlash from './files/eye-slash.svg';
import RightAngle from './files/right-angle.svg';
import Settings from './files/settings.svg';
import TrFlag from './files/tr-flag.svg';
import User from './files/user.svg';

export const EyeIcon = ({ ...props }) => <img {...props} src={Eye} alt="eye" />;
export const EyeSlashIcon = ({ ...props }) => <img {...props} src={EyeSlash} alt="eye-slash" />;
export const DownAngleIcon = ({ ...props }) => <img {...props} src={DownAngle} alt="down-angle" />;
export const RightAngleIcon = ({ ...props }) => (
  <img {...props} src={RightAngle} alt="right-angle" />
);
export const SettingsIcon = ({ ...props }) => <img {...props} src={Settings} alt="settings" />;
export const TrFlagIcon = ({ ...props }) => <img {...props} src={TrFlag} alt="tr-flag" />;
export const UserIcon = ({ ...props }) => <img {...props} src={User} alt="user" />;
