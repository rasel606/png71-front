// components/TransactionRecords/TransactionRecords.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { searchTransactionsbyUserId } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../../../contexts/AuthContext";


const TransactionRecords = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userDeatils } = useAuth();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState("timeline");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const statusOptions = [
    { label: "Processing", value: 0 },
    { label: "Approved", value: 1 },
    { label: "Rejected", value: 2 },
  ];
  
  const paymentTypeOptions = [
    { label: "Deposit", value: 0 },
    { label: "Withdrawal", value: 1 },
    { label: "Adjustment", value: 2 },
  ];
  
  const dateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "last7days" },
  ];

  const [filters, setFilters] = useState({
    status: [0, 1, 2],
    type: [0, 1],
    date: "last7days",
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "date") {
        return { ...prev, date: value };
      }
      return {
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter((v) => v !== value)
          : [...prev[filterType], value],
      };
    });
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
    //   const response = await searchTransactionsbyUserId({
    //     userId,
    //     filters,
    //   });
      setTransactions([]);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, userId]);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
  };

  const closeDetailView = () => {
    setShowDetails(false);
    setSelectedTransaction(null);
    setActiveTab("timeline");
  };

  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0: return "pending";
      case 1: return "positive";
      case 2: return "negative";
      default: return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0: return "Processing";
      case 1: return "Approved";
      case 2: return "Rejected";
      default: return "Unknown";
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 0: return "Deposit";
      case 1: return "Withdrawal";
      case 2: return "Adjustment";
      default: return "Unknown";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB').replace(/\//g, ' : ');
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Transaction Records</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="popup-page-main__container">
            <div className="content mcd-style player-content">
              <div className="transaction-records">
                {/* Filter Section */}
                <div className="search-tab">
                  <div className="tab filter-tab">
                    <ul className="item-ani">
                      <li className="active">{filters.date}</li>
                    </ul>
                    <div 
                      className="btn search-btn"
                      onClick={() => setIsFilterOpen(true)}
                    >
                      <span 
                        className="item-icon"
                        style={{ 
                          maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/games-filter-icon.svg?v=1760412521693')" 
                        }}
                      ></span>
                    </div>
                  </div>

                  {/* Filter Panel */}
                  {isFilterOpen && (
                    <div className="searchpage active">
                      <div className="search-top-info">
                        <div className="back" onClick={() => setIsFilterOpen(false)}>
                          <span 
                            className="item-icon"
                            style={{ 
                              maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1760412521693')" 
                            }}
                          ></span>
                          Back
                        </div>
                        <input 
                          type="text" 
                          placeholder="Transaction Record Filter" 
                          disabled 
                          style={{ backgroundImage: "url('')" }}
                        />
                      </div>

                      <div className="searchpage-main">
                        <FilterGroup
                          title="Status"
                          type="checkbox"
                          options={statusOptions}
                          selected={filters.status}
                          onChange={(val) => handleFilterChange("status", val)}
                        />

                        <FilterGroup
                          title="Payment Type"
                          type="checkbox"
                          options={paymentTypeOptions}
                          selected={filters.type}
                          onChange={(val) => handleFilterChange("type", val)}
                        />

                        <FilterGroup
                          title="Date"
                          type="radio"
                          options={dateOptions}
                          selected={filters.date}
                          onChange={(val) => handleFilterChange("date", val)}
                        />
                      </div>

                      <div className="searchpage-bar active">
                        <button 
                          className="button" 
                          onClick={() => setIsFilterOpen(false)}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Transaction List Header */}
                <div className="record-item item-title transaction-record-list">
                  <div className="item type">Type</div>
                  <div className="item amount">Amount</div>
                  <div className="item status">Status</div>
                  <div className="item time">Txn Date</div>
                </div>

                {/* Transaction List */}
                {loading ? (
                  <div className="loading-state">Loading transactions...</div>
                ) : transactions.length > 0 ? (
                  <div className="waterfall-scroll">
                    {transactions.map((tnxDate, index) => (
                      <div key={index} className="list list-betting-record">
                        <div className="date-title">
                          <div className="date">
                            <span 
                              className="item-icon"
                              style={{ 
                                maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1760412521693')" 
                              }}
                            ></span>
                            {tnxDate.date}
                          </div>
                          <div className="time-zone">GMT+6</div>
                        </div>

                        <div className="list-content">
                          {tnxDate.transactions.map((tx, txIndex) => (
                            <div
                              key={tx._id || txIndex}
                              className="record-item transaction-record-list no-detail-info"
                              onClick={() => handleTransactionClick(tx)}
                            >
                              <div className="item type">
                                {getTypeText(tx.type)}
                              </div>
                              <div className="item amount">
                                <i>{tx.base_amount}</i>
                              </div>
                              <div className={`item status ${getStatusClass(tx.status)}`}>
                                <div className="tags">
                                  {getStatusText(tx.status)}
                                </div>
                              </div>
                              <div className="item time">
                                {formatTime(tx.datetime)}
                              </div>
                              <div 
                                className="list-arrow"
                                style={{ 
                                  display: 'block', 
                                  maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1760412521693')" 
                                }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="prompt">－end of page－</div>
                  </div>
                ) : (
                  <div className="no-data">
                    <div className="no-result">
                      <div className="pic">
                        <img 
                          alt="no-data" 
                          src="https://img.s628b.com/sb/h5/assets/images/no-data.png?v=1760412521693&source=mcdsrc" 
                          loading="lazy" 
                        />
                      </div>
                      <div className="text">No Data</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Popup */}
      {showDetails && selectedTransaction && (
        <div className="pop-transaction-records-details active">
          <div className="pop-bg" onClick={closeDetailView}></div>
          
          <div className="details-content">
            <div className="bank-name">
              <img
                src={`https://img.s628b.com/sb/h5/assets/images/payment/${selectedTransaction.gateway_name?.toLowerCase() || 'default'}.png?v=1760412521693&source=mcdsrc`}
                alt={selectedTransaction.gateway_name || 'payment'}
                onError={(e) => {
                  e.target.src = 'https://img.s628b.com/sb/h5/assets/images/payment/default.png?v=1760412521693&source=mcdsrc';
                }}
              />
              <span>{selectedTransaction.gateway_name || 'Payment'}</span>
            </div>

            <a 
              className="btn-closed" 
              onClick={closeDetailView}
              style={{ 
                maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1760412521693')" 
              }}
            ></a>

            <div className="header">Transaction Record Details</div>

            <div className={`content pop-content ${getStatusClass(selectedTransaction.status)}`}>
              {/* Tab Buttons */}
              <div className="tab-button-not-link">
                <div className="tab-btn-section tab-btn-wrap">
                  <div className="tab-btn tab-btn-bar">
                    <div 
                      className="line" 
                      style={{ 
                        width: '50%', 
                        transform: `translate(${activeTab === 'timeline' ? '0%' : '100%'}, 0px)` 
                      }}
                    ></div>
                    
                    <div 
                      className={`btn ${activeTab === 'timeline' ? 'current' : ''}`}
                      onClick={() => setActiveTab('timeline')}
                    >
                      <img
                        className="icon"
                        src="https://img.s628b.com/sb/h5/assets/images/icon-set/icon-timeline.svg?v=1760412521693&source=mcdsrc"
                        alt="icon-timeline"
                        loading="lazy"
                      />
                    </div>

                    <div 
                      className={`btn ${activeTab === 'details' ? 'current' : ''}`}
                      onClick={() => setActiveTab('details')}
                    >
                      <img
                        className="icon"
                        src="https://img.s628b.com/sb/h5/assets/images/icon-set/icon-table.svg?v=1760412521693&source=mcdsrc"
                        alt="icon-table"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="tab-content tab-content-page">
                <div 
                  className="inner-wrap"
                  style={{
                    transform: `translate(${activeTab === 'timeline' ? '0%' : '-100%'}, 0px)`
                  }}
                >
                  {/* Timeline Tab */}
                  <div 
                    className={`inner-box ${activeTab === 'timeline' ? 'active' : ''}`}
                    style={{ height: 'auto' }}
                    data-tab-current={activeTab === 'timeline' ? 'current' : ''}
                  >
                    <div className="transaction-details-wrap">
                      <div className="title">
                        <h3>Transaction Progress</h3>
                        <div className="tags">
                          {getStatusText(selectedTransaction.status)}
                        </div>
                      </div>

                      <div className="timeline-box">
                        <div className="date">
                          {new Date(selectedTransaction.datetime).toLocaleDateString('en-GB').replace(/\//g, '/')}
                        </div>

                        <div className={`timeline-block ${selectedTransaction.status === 1 ? 'current' : ''}`}>
                          <div className={`point ${selectedTransaction.status === 1 ? 'bounce' : ''}`}>
                            <span 
                              className="item-icon"
                              style={{
                                maskImage: `url(${
                                  selectedTransaction.status === 0
                                    ? "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-pending-type05.svg"
                                    : selectedTransaction.status === 1
                                    ? "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type06.svg"
                                    : "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type07.svg"
                                })`
                              }}
                            ></span>
                          </div>

                          <div 
                            className="content"
                            style={{
                              animation: `1s ease 0.2s 1 normal none running slide`
                            }}
                          >
                            <div className="text">
                              Transaction {getStatusText(selectedTransaction.status).toLowerCase()}
                            </div>
                            <div className="time">
                              {formatTime(selectedTransaction.updatetime || selectedTransaction.datetime)}
                            </div>
                          </div>
                        </div>

                        <div className="date">
                          {new Date(selectedTransaction.datetime).toLocaleDateString('en-GB').replace(/\//g, '/')}
                        </div>

                        <div className="timeline-block">
                          <div className="point">
                            <span 
                              className="item-icon"
                              style={{
                                maskImage: `url(${
                                  selectedTransaction.status === 0
                                    ? "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-pending-type05.svg"
                                    : selectedTransaction.status === 1
                                    ? "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type06.svg"
                                    : "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type07.svg"
                                })`
                              }}
                            ></span>
                          </div>

                          <div 
                            className="content"
                            style={{
                              animation: `1s ease 0.3s 1 normal none running slide`
                            }}
                          >
                            <div className="text">
                              Transaction processed
                            </div>
                            <div className="time">
                              {formatTime(selectedTransaction.datetime)}
                            </div>
                          </div>
                        </div>

                        <div className="date">
                          {new Date(selectedTransaction.datetime).toLocaleDateString('en-GB').replace(/\//g, '/')}
                        </div>

                        <div className="timeline-block">
                          <div className="point">
                            <span 
                              className="item-icon"
                              style={{
                                maskImage: `url(${
                                  selectedTransaction.status === 0
                                    ? "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-pending-type05.svg"
                                    : selectedTransaction.status === 1
                                    ? "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type06.svg"
                                    : "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type07.svg"
                                })`
                              }}
                            ></span>
                          </div>

                          <div 
                            className="content"
                            style={{
                              animation: `1s ease 0.4s 1 normal none running slide`
                            }}
                          >
                            <div className="text">
                              Transaction initiated
                            </div>
                            <div className="time">
                              {formatTime(selectedTransaction.datetime)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Tab */}
                  <div 
                    className={`inner-box ${activeTab === 'details' ? 'active' : ''}`}
                    style={{ height: 'auto' }}
                    data-tab-current={activeTab === 'details' ? 'current' : ''}
                  >
                    <div className="transaction-details-wrap">
                      <div className="title">
                        <h3>Transaction Record Details</h3>
                        <div className="tags">
                          {getStatusText(selectedTransaction.status)}
                        </div>
                      </div>

                      <div className="details-box">
                        <div className="info">
                          <div className="name">No.</div>
                          <div className="value">{selectedTransaction._id}</div>
                        </div>

                        <div className="info">
                          <div className="name">Type</div>
                          <div className="value">
                            {getTypeText(selectedTransaction.type)} Payment Gateway
                          </div>
                        </div>

                        <div className="info">
                          <div className="name">Payment Method</div>
                          <div className="value">
                            {selectedTransaction.gateway_name}
                          </div>
                        </div>

                        <div className="info">
                          <div className="name">Payment Type</div>
                          <div className="value">
                            {selectedTransaction.gateway_name} Payment
                          </div>
                        </div>

                        <div className="info">
                          <div className="name">Bank Name</div>
                          <div className="value">
                            {selectedTransaction.gateway_name?.toUpperCase()}
                          </div>
                        </div>

                        <div className="info">
                          <div className="name">Amount</div>
                          <div className="value">
                            <i>
                              {selectedTransaction.currency}{selectedTransaction.base_amount}
                            </i>
                          </div>
                        </div>

                        {selectedTransaction.transactionID && (
                          <div className="info">
                            <div className="name">Reference No.</div>
                            <div className="value">
                              {selectedTransaction.transactionID}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="member-content">
              <div id="txn-submitMissingTrx" className="button">
                <a>Submit Missing Transaction</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// FilterGroup Component
const FilterGroup = ({ title, type, options, selected, onChange }) => (
  <div className="search-checkbox-group check-group">
    <h2>{title}</h2>
    <ul>
      {options.map((option) => (
        <li key={option.value}>
          <input
            type={type}
            checked={
              type === "radio"
                ? selected === option.value
                : selected.includes(option.value)
            }
            onChange={() => onChange(option.value)}
          />
          <label>{option.label}</label>
        </li>
      ))}
    </ul>
  </div>
);

export default TransactionRecords;