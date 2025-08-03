import { Types } from "mongoose";

export interface IReview {
    rating: number;
    comment: string;
    reviewedAt?: Date;
};

export interface IAdmission {
    candidateName: string;
    subject: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    image: string;
    college: Types.ObjectId;
    reviews?: IReview[];
};