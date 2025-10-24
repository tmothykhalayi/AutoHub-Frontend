// src/api/driverApi.ts

import { getAccessTokenHelper, getUserIdHelper } from "@/lib/authHelper";
import { url } from "./url";
import type { AssignmentUpdate } from "@/util/types";

export enum DriverStatus {
  OFFLINE = 'offline',
  AVAILABLE = 'available',
  ASSIGNED = 'assigned',
  IN_TRANSIT = 'in_transit',
  ON_BREAK = 'on_break',
}

export enum VehicleType {
  MOTORCYCLE = 'motorcycle',
  CAR = 'car',
  VAN = 'van',
  TRUCK = 'truck',
  BICYCLE = 'bicycle',
}
export interface CreateDriverDto {
  userId: string;
  status?: DriverStatus;
  vehicle_type: VehicleType;
  license_plate: string;
}


export const createDriver = async (driverData: CreateDriverDto) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/driver`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify(driverData),
  });

  if (!response.ok) {
    throw new Error('Failed to create driver');
  }

  return response.json();
};

export enum AssignmentStatus {
  ACCEPTED = 'accepted',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  IN_PROGRESS = 'in_progress',
}


export const getDriverOrders = async (itemStatus?:AssignmentStatus) => {
  const token = await getAccessTokenHelper()
  const userID = getUserIdHelper()
  const fullStatus = itemStatus ? `?status=${itemStatus}` : '';
  const response = await fetch(`${url}/driver/${userID}/orders${fullStatus}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get driver orders');
  }

  return response.json();
}

export const getDriverDashboard = async (id:string) => {
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/driver/dashboard/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get driver dashboard');
  }

  return response.json();
}


// happening
export const updateDriverOrderItem = async(id: string, assignments:AssignmentUpdate[])=>{
  const token = await getAccessTokenHelper()
  const response = await fetch(`${url}/assignment/${id}/order-items`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({assignments}),
  });

  if (!response.ok) {
    throw new Error('Failed to update driver order item');
  }

  return response.json();
}