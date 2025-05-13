export interface MyReferralItem {
  id: number;
  referee_email: string;
  date: string;
  points_awarded: number;
  coupon_code: string;
  coupon_expired: string;
  status: "PENDING" | "USED" | "EXPIRED";
}
