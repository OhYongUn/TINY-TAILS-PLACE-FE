'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';
import { Label } from '@repo/ui/components/ui/label';
import { Input } from '@repo/ui/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { useDepartments } from '@app/hooks/useDepartments';
import { AdminRegistrationData } from '@app/types/admins/type';
import { registerAdmin } from '@app/actions/admins/admins-service';
import { useAlert } from '@app/components/AlertDialogProvider';

interface AdminRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminRegistrationDialog = ({
  isOpen,
  onClose,
}: AdminRegistrationDialogProps) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<
    AdminRegistrationData & {
      confirmPassword: string;
      primaryDepartmentId: string;
    }
  >();
  const { data: departments, isLoading, error } = useDepartments();
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const [secondaryDepartments, setSecondaryDepartments] = useState<any[]>([]);

  const primaryDepartmentId = watch('primaryDepartmentId');

  useEffect(() => {
    if (primaryDepartmentId && departments) {
      const primaryDept = departments.find(
        (dept) => dept.id === primaryDepartmentId,
      );
      setSecondaryDepartments(primaryDept?.children || []);
      setValue('departmentId', ''); // Reset secondary department selection
    }
  }, [primaryDepartmentId, departments, setValue]);

  const mutation = useMutation({
    mutationFn: (data: AdminRegistrationData) => registerAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      reset();
      onClose();
      showAlert('성공', '관리자가 성공적으로 등록되었습니다.', 'success');
    },
    onError: (error) => {
      console.log(error);
      showAlert('실패', '알 수 없는 오류가 발생했습니다.', 'error');
    },
  });

  const onSubmit = (
    data: AdminRegistrationData & {
      confirmPassword: string;
      primaryDepartmentId: string;
    },
  ) => {
    const { confirmPassword, primaryDepartmentId, ...submitData } = data;
    mutation.mutate(submitData);
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 7)
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>신규 관리자 등록</DialogTitle>
          <DialogDescription>
            새로운 관리자의 정보를 입력해주세요. 모든 필드는 필수입니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                이메일
              </Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: '이메일은 필수입니다.',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: '올바른 이메일 형식이 아닙니다.',
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                이름
              </Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: '이름은 필수입니다.' }}
                render={({ field }) => (
                  <Input id="name" className="col-span-3" {...field} />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                비밀번호
              </Label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: '비밀번호는 필수입니다.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다.',
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    className="col-span-3"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                비밀번호 확인
              </Label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: '비밀번호 확인은 필수입니다.',
                  validate: (value) =>
                    value === watch('password') ||
                    '비밀번호가 일치하지 않습니다.',
                }}
                render={({ field }) => (
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="col-span-3"
                    {...field}
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                전화번호
              </Label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: '전화번호는 필수입니다.',
                  pattern: {
                    value: /^010-\d{4}-\d{4}$/,
                    message:
                      '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)',
                  },
                }}
                render={({ field: { onChange, value, ...field } }) => (
                  <Input
                    id="phone"
                    type="tel"
                    className="col-span-3"
                    onChange={(e) =>
                      onChange(formatPhoneNumber(e.target.value))
                    }
                    value={value}
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="primaryDepartmentId" className="text-right">
                1차 부서
              </Label>
              <Controller
                name="primaryDepartmentId"
                control={control}
                rules={{ required: '1차 부서 선택은 필수입니다.' }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading || !!error}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue
                        placeholder={
                          isLoading
                            ? '로딩 중...'
                            : error
                              ? '오류 발생'
                              : '1차 부서 선택'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading && (
                        <SelectItem value="">로딩 중...</SelectItem>
                      )}
                      {error && (
                        <SelectItem value="">
                          오류: 부서 목록을 불러올 수 없습니다
                        </SelectItem>
                      )}
                      {departments?.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.primaryDepartmentId && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  {errors.primaryDepartmentId.message}
                </p>
              )}
            </div>

            {primaryDepartmentId && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departmentId" className="text-right">
                  2차 부서
                </Label>
                <Controller
                  name="departmentId"
                  control={control}
                  rules={{ required: '2차 부서 선택은 필수입니다.' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={secondaryDepartments.length === 0}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="2차 부서 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {secondaryDepartments.length === 0 ? (
                          <SelectItem value="">하위 부서가 없습니다</SelectItem>
                        ) : (
                          secondaryDepartments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.departmentId && (
                  <p className="text-red-500 text-sm col-start-2 col-span-3">
                    {errors.departmentId.message}
                  </p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? '등록 중...' : '등록'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
