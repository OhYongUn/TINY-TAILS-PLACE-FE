import React, { useState, useEffect, useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { Department } from '@app/types/admins/type';

interface DepartmentSelectProps {
  departments: Department[];
  onDepartmentChange: (departmentId: string | null) => void;
  selectedDepartmentId: string | null;
}

export default function DepartmentSelect({
  departments,
  onDepartmentChange,
  selectedDepartmentId,
}: DepartmentSelectProps) {
  const [level1, setLevel1] = useState<string | null>(null);
  const [level2, setLevel2] = useState<string | null>(null);
  const [level2Options, setLevel2Options] = useState<Department[]>([]);

  useEffect(() => {
    if (selectedDepartmentId) {
      const selectedDept = departments.find(
        (dept) => dept.id === selectedDepartmentId,
      );
      if (selectedDept) {
        setLevel1(selectedDept.id);
        setLevel2Options(selectedDept.children || []);
      } else {
        const parentDept = departments.find((dept) =>
          dept.children?.some((child) => child.id === selectedDepartmentId),
        );
        if (parentDept) {
          setLevel1(parentDept.id);
          setLevel2Options(parentDept.children || []);
          setLevel2(selectedDepartmentId);
        }
      }
    } else {
      setLevel1(null);
      setLevel2(null);
      setLevel2Options([]);
    }
  }, [selectedDepartmentId, departments]);

  const handleLevel1Change = useCallback(
    (value: string) => {
      const newValue = value === 'all' ? null : value;
      setLevel1(newValue);
      setLevel2(null);
      if (newValue) {
        const selectedDept = departments.find((dept) => dept.id === newValue);
        setLevel2Options(selectedDept?.children || []);
        onDepartmentChange(newValue);
      } else {
        setLevel2Options([]);
        onDepartmentChange(null);
      }
    },
    [departments, onDepartmentChange],
  );

  const handleLevel2Change = useCallback(
    (value: string) => {
      const newValue = value === 'all' ? null : value;
      setLevel2(newValue);
      onDepartmentChange(newValue || level1);
    },
    [level1, onDepartmentChange],
  );

  return (
    <div className="flex space-x-2">
      <Select value={level1 || 'all'} onValueChange={handleLevel1Change}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="1차 부서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          {departments.map((dept) => (
            <SelectItem key={dept.id} value={dept.id}>
              {dept.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={level2 || 'all'} onValueChange={handleLevel2Change}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="2차 부서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          {level2Options.map((dept) => (
            <SelectItem key={dept.id} value={dept.id}>
              {dept.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
