import { Modal as AntdModal } from 'antd'; 

const MyModal = ({
  title,
  visible,
  onOk,
  onCancel,
  children,
  footer,
  ...rest 
}) => {
  return (
    <AntdModal
      title={title? title : null}
      open={visible} 
      onOk={onOk}
      onCancel={onCancel}
      footer={footer} 
      {...rest} 
    >
      {children}
    </AntdModal>
  );
};

export default MyModal;