import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 28px;
  width: 420px;
  max-width: calc(100% - 32px);
`;

export const ModalTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 20px;
`;

export const ModalText = styled.p`
  margin: 0 0 24px;
  color: #4b5563;
  font-size: 14px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
