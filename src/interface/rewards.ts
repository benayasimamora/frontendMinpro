export interface PointReward {
  id: number;
  amount: number;
  expired_at: string;
}

export interface CouponReward {
  id: number;
  code: string;
  expired_at: string;
  status: "AVAILABLE" | "USED" | "EXPIRED";
}

export interface Reward {
  point: PointReward[];
  coupons: CouponReward[];
}
