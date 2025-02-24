import MyModal from "../shared/modal";

const BalanceInquiry = ({
  modalContent,
  modalVisible,
  handleOk,
  handleCancel,
  balanceVisible,
}) => {
  return (
    <>
      <MyModal
        title={modalContent?.title}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {modalContent?.balance !== undefined && (
          <div className="flex items-center flex-col justify-between gap-5">
            <p className="text-xl font-semibold">
              Your Balance:{" "}
              {balanceVisible ? (
                <span className="text-green-600">{modalContent.balance}</span>
              ) : (
                <span className="blur-sm">******</span>
              )}
            </p>
            <button
              onClick={modalContent.action}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              {balanceVisible ? "Hide Balance" : "Show Balance"}
            </button>
          </div>
        )}
        {modalContent?.content && (
          <p className="text-gray-700">{modalContent.content}</p>
        )}
      </MyModal>
    </>
  );
};

export default BalanceInquiry;
