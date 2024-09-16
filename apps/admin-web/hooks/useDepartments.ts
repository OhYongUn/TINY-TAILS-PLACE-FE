'use client';

import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '@app/actions/departments/departments-service';
import { Department } from '@app/types/admins/type';

export function useDepartments() {
  return useQuery<Department[], Error>({
    queryKey: ['departments'],
    queryFn: () => getDepartments(), // depth를 2로 고정
    //staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
