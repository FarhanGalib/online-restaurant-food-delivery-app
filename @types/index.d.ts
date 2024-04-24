type TId = string;

type TUser = {
  userId: TId;
  FastName: string;
  LastName: string;
  email: string;
  phone: string;
  address: string;
};

type TAuthenticate = {
  user: TUser;
  accessToken: string;
  expiresAt: string | Date;
};

type TSuccess<T = void> = {
  success: boolean;
  message: string;
  code: number;
  data: T;
};

type TAuthContext = {
  token?: string | undefined;
};

type TAuth = {
  email: string;
  password: string;
};

type TOption = {
  name: string;
  id: string | number;
};

type TDay =
  | 'saturday'
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday';

type TBranch = {
  id: TId;
  branchName: string;
  address: string;
  ratings: number;
  phone: string[];
  image: string;
  open: Record<TDay, string>;
};

type TBranches = TBranch[];

type TSearchString = { searchString: string };

type TLocationBranchRelation = {
  id: string;
  name: string;
  branchesId: TId[];
};

type TLocations = TLocationBranchRelation[];

type TLocation = { value: string; label: string; branchesId: string[] };

type TFoodItem = {
  id: TId;
  name: string;
  categoryId: string;
  price: number;
  image: string;
};

type TFoodCategory = {
  id: TId;
  name: string;
};

type TAddress = { address: string };

type TType = 'PLUS' | 'MINUS';

type TCartFoodItem = {
  item: TFoodItem;
  quantity: number;
};

type TCart = {
  branchId: TId;
  cart: TCartFoodItem[];
};

type TAddToCart = (branchId: TId, item: TCartFoodItem[]) => void;

type TRemoveFromCart = (id: TId) => void;

type TUpdateCart = (updatedItems: TCartFoodItem[], nullValue?: boolean) => void;

type TTotalItems = () => number | undefined;

type TTotalAmount = () => number | undefined;

type TCartContext = {
  cart: TCart | undefined;
  handleAddToCart: TAddToCart;
  handleRemoveFromCart: TRemoveFromCart;
  updateCart: TUpdateCart;
  getTotalItems: TTotalItems;
  getTotalAmount: TTotalAmount;
};

type TOrderStatus =
  | 'Pending'
  | 'Preparing'
  | 'ReadyForDelivery'
  | 'OnTheWay'
  | 'Delivered'
  | 'AtYourDoor';

type TOrder = {
  id: TId;
  status: TOrderStatus;
  deliveryAddress: TAddress;
  orderedItems: TCart;
  totalItems: number;
  totalAmount: number;
};
