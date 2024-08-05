import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';

interface PetSelectorProps {
  onValueChange: (value: string) => void;
}

const PetSelector: React.FC<PetSelectorProps> = ({ onValueChange }) => (
  <div>
    <label
      htmlFor="pets"
      className="block text-sm font-medium text-foreground mb-2"
    >
      Number of Pets
    </label>
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select number of pets" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 pet</SelectItem>
        <SelectItem value="2">2 pets</SelectItem>
        <SelectItem value="3">3 pets</SelectItem>
        <SelectItem value="4">4 pets</SelectItem>
        <SelectItem value="5">5 pets</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default PetSelector;
