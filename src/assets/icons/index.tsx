import Eye from './files/eye.svg';
import EyeSlash from './files/eye-slash.svg';

export const EyeIcon = ({ ...props }) => <img {...props} src={Eye} alt="eye" />;
export const EyeSlashIcon = ({ ...props }) => <img {...props} src={EyeSlash} alt="eye-slash" />;
