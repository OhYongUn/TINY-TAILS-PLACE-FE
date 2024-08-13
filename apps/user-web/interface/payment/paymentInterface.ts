export interface paymentData {
  storeId: string;
  paymentId: string;
  orderName: string;
  totalAmount: number;
  currency: string;
  payMethod: string;
  channelKey: string;
  customer: {
    customerId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: {
      country: string; //KR
      addressLine1: string;
      addressLine2: string;
    };
  };
}
