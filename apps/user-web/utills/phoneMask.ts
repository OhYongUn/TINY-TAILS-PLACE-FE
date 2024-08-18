// utils/phoneMask.ts

/**
 * 전화번호를 포맷팅합니다.
 * @param value 포맷할 전화번호 문자열
 * @returns 포맷된 전화번호 문자열
 */
export const formatPhoneNumber = (value: string): string => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

/**
 * 전화번호에서 하이픈을 제거합니다.
 * @param value 하이픈을 제거할 전화번호 문자열
 * @returns 하이픈이 제거된 전화번호 문자열
 */
export const removePhoneNumberFormatting = (value: string): string => {
  return value.replace(/-/g, '');
};

/**
 * 전화번호가 유효한지 검사합니다.
 * @param value 검사할 전화번호 문자열
 * @returns 전화번호 유효 여부
 */
export const isValidPhoneNumber = (value: string): boolean => {
  const phoneNumber = removePhoneNumberFormatting(value);
  return /^01[016789]\d{7,8}$/.test(phoneNumber);
};

/**
 * 전화번호 입력 시 사용할 수 있는 onChange 핸들러
 * @param value 현재 입력값
 * @param onChange 상태 업데이트 함수
 */
export const handlePhoneNumberChange = (
  value: string,
  onChange: (value: string) => void,
) => {
  const formattedValue = formatPhoneNumber(value);
  onChange(formattedValue);
};

/**
 * 전화번호 커스텀 훅
 * @returns 전화번호 관련 유틸리티 함수들
 */
export const usePhoneMask = () => {
  return {
    formatPhoneNumber,
    removePhoneNumberFormatting,
    isValidPhoneNumber,
    handlePhoneNumberChange,
  };
};
