export const DB_NAME = 'neploomdb';

/**
 * @type {{ ADMIN: "ADMIN"; USER: "USER"} as const}
 */
export const UserRolesEnum = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

/**
 * @type {{ GOOGLE: "GOOGLE"; EMAIL_PASSWORD: "EMAIL_PASSWORD"} as const}
 */
export const UserLoginType = {
    GOOGLE: 'GOOGLE',
    EMAIL_PASSWORD: 'EMAIL_PASSWORD',
};

export const AvailableSocialLogins = Object.values(UserLoginType);

/**
 * @type {{ FLAT:"FLAT"; } as const}
 */
export const CouponTypeEnum = {
    FLAT: 'FLAT',
    // PERCENTAGE: "PERCENTAGE",
};

export const AvailableCouponTypes = Object.values(CouponTypeEnum);

/**
 * @type {{ PENDING: "PENDING"; CANCELLED: "CANCELLED"; DELIVERED: "DELIVERED" } as const}
 */
export const OrderStatusEnum = {
    PENDING: 'PENDING',
    CANCELLED: 'CANCELLED',
    DELIVERED: 'DELIVERED',
};

export const AvailableOrderStatuses = Object.values(OrderStatusEnum);

/**
 * @type {{ UNKNOWN:"UNKNOWN"; KHALTI: "KHALTI"; } as const}
 */
export const PaymentProviderEnum = {
    UNKNOWN: 'UNKNOWN',
    KHALTI: 'KHALTI',
};

export const AvailablePaymentProviders = Object.values(PaymentProviderEnum);
