import AddWhite from './files/add-white.svg';
import BillInformation from './files/bill-information.svg';
import BillManagement from './files/bill-management.svg';
import CompanyDetailInfo from './files/company-detail-info.svg';
import CompanyInfo from './files/company-info.svg';
import CompanyManagement from './files/company-management.svg';
import CompletedTransportation from './files/completed-transportation.svg';
import DownAngle from './files/down-angle.svg';
import DriverInventory from './files/driver-inventory.svg';
import Eye from './files/eye.svg';
import EyeSlash from './files/eye-slash.svg';
import Inventory from './files/inventory.svg';
import PinLogo from './files/pin-logo.svg';
import RampManagement from './files/ramp-management.svg';
import Reports from './files/reports.svg';
import RightAngle from './files/right-angle.svg';
import Settings from './files/settings.svg';
import SpotMarket from './files/spot-market.svg';
import Tirboard from './files/tirboard.svg';
import TrFlag from './files/tr-flag.svg';
import TransportMethod from './files/transport-method.svg';
import User from './files/user.svg';
import UserManagement from './files/user-management.svg';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const EyeIcon = ({ ...props }: IconProps) => <img {...props} src={Eye} alt="eye" />;
export const EyeSlashIcon = ({ ...props }: IconProps) => (
  <img {...props} src={EyeSlash} alt="eye-slash" />
);
export const DownAngleIcon = ({ ...props }: IconProps) => (
  <img {...props} src={DownAngle} alt="down-angle" />
);
export const RightAngleIcon = ({ ...props }: IconProps) => (
  <img {...props} src={RightAngle} alt="right-angle" />
);
export const SettingsIcon = ({ ...props }: IconProps) => (
  <img {...props} src={Settings} alt="settings" />
);
export const TrFlagIcon = ({ ...props }: IconProps) => (
  <img {...props} src={TrFlag} alt="tr-flag" />
);
export const UserIcon = ({ ...props }: IconProps) => <img {...props} src={User} alt="user" />;
export const PinLogoIcon = ({ ...props }: IconProps) => (
  <img {...props} src={PinLogo} alt="pin-logo" />
);
export const InventoryIcon = ({ ...props }: IconProps) => (
  <img {...props} src={Inventory} alt="inventory" />
);
export const UserManagementIcon = ({ ...props }: IconProps) => (
  <img {...props} src={UserManagement} alt="user-management" />
);
export const CompanyManagementIcon = ({ ...props }: IconProps) => (
  <img {...props} src={CompanyManagement} alt="company-management" />
);
export const TransportMethodIcon = ({ ...props }: IconProps) => (
  <img {...props} src={TransportMethod} alt="transport-method" />
);
export const SpotMarketIcon = ({ ...props }: IconProps) => (
  <img {...props} src={SpotMarket} alt="spot-market" />
);
export const ReportsIcon = ({ ...props }: IconProps) => (
  <img {...props} src={Reports} alt="reports" />
);
export const BillManagementIcon = ({ ...props }: IconProps) => (
  <img {...props} src={BillManagement} alt="bill-management" />
);
export const CompletedTransportationIcon = ({ ...props }: IconProps) => (
  <img {...props} src={CompletedTransportation} alt="completed-transportation" />
);
export const RampManagementIcon = ({ ...props }: IconProps) => (
  <img {...props} src={RampManagement} alt="ramp-management" />
);
export const TirboardIcon = ({ ...props }: IconProps) => (
  <img {...props} src={Tirboard} alt="tirboard" />
);

export const CompanyInfoIcon = ({ ...props }: IconProps) => (
  <img {...props} src={CompanyInfo} className="size-12" alt="company-info" />
);

export const CompanyDetailInfoIcon = ({ ...props }: IconProps) => (
  <img {...props} src={CompanyDetailInfo} className="size-12" alt="company-detail-info" />
);

export const BillInformationIcon = ({ ...props }: IconProps) => (
  <img {...props} src={BillInformation} className="size-11" alt="bill-information" />
);

export const DriverInventoryIcon = ({ ...props }: IconProps) => (
  <img {...props} src={DriverInventory} className="size-12" alt="driver-inventory" />
);
export const AddWhiteIcon = ({ ...props }: IconProps) => (
  <img {...props} src={AddWhite} alt="add-white" />
);
