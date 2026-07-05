import { api } from './client';
import { User } from '../stores/auth.store';

export interface StudentSchedule {
  id: string;
  userId: string;
  universityCity: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
  gradeFileUrl: string;
  updatedAt: string;
}

export interface TripHistoryItem {
  tripId: string;
  date: string;
  routeName: string;
  direction: 'OUTBOUND' | 'INBOUND';
  pickupPoint: {
    id: string;
    name: string;
    address?: string;
  };
  dropoffPoint: {
    id: string;
    name: string;
    address?: string;
  };
  status: string;
}

export interface PaginatedTripHistory {
  data: TripHistoryItem[];
  total: number;
  page: number;
  limit: number;
}

export async function listUsers(params: {
  role?: string;
  status?: string;
  accessibilityStatus?: string;
  municipalityId?: string;
  search?: string;
}): Promise<User[]> {
  const r = await api.get('/users', { params });
  return r.data;
}

export async function getUserById(id: string): Promise<User> {
  const r = await api.get(`/users/${id}`);
  return r.data;
}

export async function getStudentSchedule(id: string): Promise<StudentSchedule> {
  const r = await api.get(`/users/${id}/schedule`);
  return r.data;
}

export async function updateStudentSchedule(id: string, payload: Partial<Omit<StudentSchedule, 'id' | 'userId' | 'gradeFileUrl' | 'updatedAt'>>): Promise<StudentSchedule> {
  const r = await api.patch(`/users/${id}/schedule`, payload);
  return r.data;
}

export async function getStudentTrips(id: string, params: { page?: number; limit?: number }): Promise<PaginatedTripHistory> {
  const r = await api.get(`/users/${id}/trips`, { params });
  return r.data;
}

export async function updateStatus(id: string, status: 'APPROVED' | 'REJECTED'): Promise<User> {
  const r = await api.patch(`/users/${id}/status`, { status });
  return r.data;
}

export async function reviewAccessibility(
  id: string,
  payload: { status: 'APPROVED' | 'REJECTED'; reviewNote?: string }
): Promise<User> {
  const { reviewNote, ...rest } = payload;
  const backendPayload = {
    ...rest,
    ...(reviewNote !== undefined ? { note: reviewNote } : {}),
  };
  const r = await api.patch(`/users/${id}/accessibility`, backendPayload);
  return r.data;
}

export async function getMe(): Promise<User> {
  const r = await api.get('/users/me');
  return r.data;
}

export async function updateMe(payload: { phone?: string; email?: string }): Promise<User> {
  const r = await api.patch('/users/me', payload);
  return r.data;
}

export async function requestVerificationCode(payload: {
  type: 'EMAIL' | 'PHONE' | 'PASSWORD';
  channel: 'EMAIL' | 'WHATSAPP';
  value?: string;
}): Promise<{ message: string; expiresIn: number }> {
  const r = await api.post('/users/me/verification-code', payload);
  return r.data;
}

export async function updateWithVerificationCode(payload: {
  type: 'EMAIL' | 'PHONE' | 'PASSWORD';
  code: string;
  newValue: string;
  currentPassword?: string;
}): Promise<User> {
  const r = await api.put('/users/me/update-with-code', payload);
  return r.data;
}

