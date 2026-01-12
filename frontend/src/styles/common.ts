import styled from 'styled-components';

export const Page = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 32px 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 24px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Card = styled.div`
  border: 1px solid #e4e7eb;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #cfd4dc;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #5b8cff;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #cfd4dc;
  font-size: 14px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'danger' | 'ghost' }>`
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  border: none;

  ${({ variant }) => {
    switch (variant) {
      case 'danger':
        return `
          background: #ffe8e8;
          color: #c0392b;
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #5b8cff;
        `;
      default:
        return `
          background: #5b8cff;
          color: white;
        `;
    }
  }}
`;
