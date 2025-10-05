import React, { useState, useEffect } from 'react';

// --- (Existing Icons) ---
const icons = {
  LayoutDashboard: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  CandlestickChart: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 5v4"/><path d="M9 13v6"/><path d="M15 5v2"/><path d="M15 11v8"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>,
  Wallet: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>,
  Settings: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0 2l.15.08a2 2 0 0 0 .73-2.73l.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  LogOut: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Bell: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  Zap: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  List: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>,
  // New Icons
  User: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Plug: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22v-5"/><path d="M10 17l4-2"/><path d="M14 17l-4-2"/><path d="M18 10a6 6 0 1 0-12 0v5h12v-5z"/><path d="M5 22h14"/></svg>,
  Activity: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Security: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>,
  Link: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
};


// --- Mock Data ---
const mockPortfolio = { totalValue: 125680.50, realizedPL: 1250.75, unrealizedPL: -340.20 };
const mockIndices = [
    { symbol: 'NIFTY 50', price: 18540.75, change: 75.15, chartData: [4,5,5,6,7,8,7] },
    { symbol: 'BANK NIFTY', price: 43890.25, change: -120.50, chartData: [8,7,6,6,5,4,5] },
    { symbol: 'FIN NIFTY', price: 19450.60, change: 45.80, chartData: [5,6,7,6,7,8,8] },
];
const mockPositions = [
    { contract: 'NIFTY 18600 CE', qty: 50, avg: 110.50, ltp: 115.80 },
    { contract: 'BANKNIFTY 43800 PE', qty: 15, avg: 250.00, ltp: 220.10 },
];
const mockAiAnalysis = { sentiment: 'Slightly Bullish', pcr: 1.15, maxPain: 18500, summary: "PCR > 1 suggests puts are being written, providing market support." };
const mockWatchlist = ['NIFTY 18700 CE', 'BANKNIFTY 44000 CE', 'RELIANCE'];
const mockRecentTrades = [{ type: 'BUY', contract: 'FINNIFTY 19500 CE', qty: 40, price: 80.20 }];
const mockAiSuggestion = { instrument: 'NIFTY 23500 CE', strategy: 'Bullish Breakout', entry: 150.50, stopLoss: 130.00, target: 190.00, confidence: 'High (85%)', rationale: 'Nifty is showing strong upward momentum.' };

// Data for the trade tab panel
const positionsData = [
    { name: 'NIFTY 18600 CE', qty: 75, avg: 110.50, ltp: 115.80, pnl: 397.50, type: 'C' },
    { name: 'BANKNIFTY 43800 PE', qty: 15, avg: 250.00, ltp: 220.10, pnl: -448.50, type: 'P' },
];
const orderBookData = [
    { time: '09:15:30', contract: 'NIFTY 18700 CE', qty: 50, price: 105.00, status: 'OPEN', type: 'LIMIT' },
    { time: '09:15:15', contract: 'NIFTY 18600 CE', qty: 75, price: 110.50, status: 'EXECUTED', type: 'MARKET' },
];


// --- Main App Component ---
export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'option-chain':
        return <OptionChainPage />;
      case 'one-touch':
        return <OneTouchTradePage />;
      case 'scalper':
        return <ScalperPage />;
      case 'settings':
          return <SettingsPage/>;
      default:
        return <DashboardPage />;
    }
  };

  return (
    // Tailwind CSS loaded via <script src="https://cdn.tailwindcss.com"></script>
    <div className="bg-[#0D1117] text-gray-300 font-sans flex min-h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Header />
        {renderPage()}
      </main>
      <StyleInjector />
    </div>
  );
}

// --- Layout Components ---

const Sidebar = ({ activePage, setActivePage }) => (
  <aside className="w-20 bg-[#161B22] p-4 flex flex-col items-center justify-between border-r border-gray-800">
    <div>
        <div className="w-10 h-10 bg-blue-600 rounded-lg mb-10 grid place-items-center font-bold text-xl text-white">F</div>
        <nav className="space-y-6">
            <a href="#" onClick={() => setActivePage('dashboard')} className={`block p-2 rounded-lg transition-colors ${activePage === 'dashboard' ? 'bg-blue-700/50 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}><icons.LayoutDashboard /></a>
            <a href="#" onClick={() => setActivePage('option-chain')} className={`block p-2 rounded-lg transition-colors ${activePage === 'option-chain' ? 'bg-blue-700/50 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}><icons.List /></a>
            <a href="#" onClick={() => setActivePage('one-touch')} className={`block p-2 rounded-lg transition-colors ${activePage === 'one-touch' ? 'bg-blue-700/50 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}><icons.Zap /></a>
            {/* New Scalper Terminal Page */}
            <a href="#" onClick={() => setActivePage('scalper')} className={`block p-2 rounded-lg transition-colors ${activePage === 'scalper' ? 'bg-blue-700/50 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}><icons.Activity /></a>
        </nav>
    </div>
    <div className="space-y-6">
        {/* Settings page added */}
        <a href="#" onClick={() => setActivePage('settings')} className={`block p-2 rounded-lg transition-colors ${activePage === 'settings' ? 'bg-blue-700/50 text-white shadow-lg' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}><icons.Settings /></a>
        <a href="#" className="block p-2 text-gray-500 hover:text-red-500 transition-colors"><icons.LogOut /></a>
    </div>
  </aside>
);

const Header = () => (
    <header className="flex justify-between items-center pb-4 border-b border-gray-800 mb-6">
        <div>
            <h1 className="text-2xl font-bold text-white">F&O Trading Platform</h1>
            <p className="text-sm text-gray-400">Welcome back, Trader! Deploying low-latency strategies.</p>
        </div>
        <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-[#161B22] text-gray-400 hover:text-white transition-colors">
                <icons.Bell />
            </button>
            <div className="flex items-center gap-2">
                <img src="https://i.pravatar.cc/40?img=1" alt="User" className="w-10 h-10 rounded-full border border-blue-500" />
                <div>
                    <p className="font-semibold text-white">John Doe</p>
                    <p className="text-xs text-gray-500">Pro Tier</p>
                </div>
            </div>
        </div>
    </header>
);

// --- New Pages and Components ---

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('broker-apis');

    const renderSettingsContent = () => {
        switch (activeTab) {
            case 'account':
                return <AccountSettingsPanel />;
            case 'broker-apis':
                return <BrokerAPISettingsPanel />;
            case 'integrations':
                return <IntegrationsPanel />;
            default:
                return <BrokerAPISettingsPanel />;
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Settings Sub-Navigation */}
                <nav className="glass-card p-4 rounded-xl lg:w-64 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'account' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700/50'}`}
                    >
                        <icons.User className="w-5 h-5" /> Account Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('broker-apis')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'broker-apis' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700/50'}`}
                    >
                        <icons.Plug className="w-5 h-5" /> Broker APIs
                    </button>
                    <button
                        onClick={() => setActiveTab('integrations')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'integrations' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700/50'}`}
                    >
                        <icons.Link className="w-5 h-5" /> Integrations
                    </button>
                </nav>

                {/* Settings Content Area */}
                <div className="flex-1">
                    {renderSettingsContent()}
                </div>
            </div>
        </div>
    );
};

// --- Sub-Settings Components ---

const BrokerAPISettingsPanel = () => {
    const brokers = [
        { name: 'Zerodha', logo: 'Z', status: 'Connected', color: 'green-500', fields: ['API Key', 'API Secret'] },
        { name: 'Upstox', logo: 'U', status: 'Disconnected', color: 'red-500', fields: ['API Key', 'Redirect URI'] },
        { name: 'Finvasia', logo: 'F', status: 'Connected', color: 'green-500', fields: ['Client ID', 'Vendor Code'] },
        { name: 'Nubra', logo: 'N', status: 'Pending Auth', color: 'yellow-500', fields: ['Auth Token', 'Websocket Key'] },
    ];

    const [modal, setModal] = useState(null); // {name, fields}

    const connectBroker = (broker) => {
        console.log(`Attempting to connect to ${broker.name}...`);
        setModal(null);
        // Simulate connection logic
        setTimeout(() => {
            // In a real app, this would update the state after successful API call
            console.log(`${broker.name} connection status updated.`);
        }, 1000);
    };

    return (
        <div className="glass-card p-6 rounded-xl space-y-6">
            <h3 className="text-2xl font-semibold text-white">Broker API Configuration</h3>
            <p className="text-gray-400">Manage connections to your supported trading accounts. Use the 'Connect' button to configure credentials or initiate OAuth.</p>

            <div className="space-y-4">
                {brokers.map(broker => (
                    <div key={broker.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
                        <div className="flex items-center gap-4 mb-2 sm:mb-0">
                            <div className={`w-10 h-10 rounded-full bg-blue-800 grid place-items-center font-bold text-lg text-white`}>{broker.logo}</div>
                            <div>
                                <p className="font-semibold text-white">{broker.name}</p>
                                <div className="flex items-center text-sm gap-2 mt-1">
                                    <span className={`w-2 h-2 rounded-full bg-${broker.color}`}></span>
                                    <span className={`text-${broker.color} font-medium`}>{broker.status}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setModal(broker)}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg`}
                        >
                            {broker.status === 'Connected' ? 'Reconfigure' : 'Connect'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Connection Modal (Simulated) */}
            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="glass-card p-6 rounded-xl w-full max-w-md">
                        <h4 className="text-xl font-bold text-white mb-4">Connect {modal.name}</h4>
                        <div className="space-y-4">
                            {modal.fields.map(field => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">{field}</label>
                                    <input
                                        type={field.includes('Secret') || field.includes('Token') ? 'password' : 'text'}
                                        placeholder={`Enter ${modal.name} ${field}`}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setModal(null)}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => connectBroker(modal)}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                Test & Save Connection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const IntegrationsPanel = () => {
    const integrations = [
        { name: 'TradingView', description: 'Link your premium TradingView account for advanced charting.', status: 'Not Linked', color: 'red-500', action: 'Link Account' },
        { name: 'Finversia API', description: 'A common data feed for market data and analysis.', status: 'Configured', color: 'green-500', action: 'Update Config' },
    ];
    
    return (
        <div className="glass-card p-6 rounded-xl space-y-6">
            <h3 className="text-2xl font-semibold text-white">External Integrations</h3>
            <p className="text-gray-400">Connect to third-party services to enhance charting and data analysis.</p>

            <div className="space-y-4">
                {integrations.map(int => (
                    <div key={int.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
                        <div>
                            <p className="font-semibold text-white">{int.name}</p>
                            <p className="text-sm text-gray-500 max-w-md mt-1">{int.description}</p>
                            <div className="flex items-center text-xs gap-2 mt-2">
                                <span className={`w-2 h-2 rounded-full bg-${int.color}`}></span>
                                <span className={`text-${int.color} font-medium`}>{int.status}</span>
                            </div>
                        </div>
                        <button
                            className="mt-3 sm:mt-0 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            {int.action}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AccountSettingsPanel = () => (
    <div className="glass-card p-6 rounded-xl space-y-6">
        <h3 className="text-2xl font-semibold text-white">Account Profile</h3>
        <p className="text-gray-400">Update your personal information and profile settings.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                <input type="email" defaultValue="john.doe@trade.com" disabled className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-gray-500" />
            </div>
        </div>
        
        <h3 className="text-2xl font-semibold text-white pt-4 border-t border-gray-800 flex items-center gap-2">
            <icons.Security className="w-6 h-6 text-yellow-400"/> Security Settings
        </h3>
        
        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Change Password
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 ml-3 rounded-md transition-colors">
            Setup 2FA/TOTP
        </button>

        <div className="pt-4 border-t border-gray-800 mt-6">
             <p className="text-sm text-gray-500">
                For security reasons, any change in API configuration requires re-authentication.
             </p>
        </div>
    </div>
);

// --- New Scalper Page (Based on Screenshot 2025-10-05 145055.png) ---

const ScalperPage = () => {
    // Mock data for the two-sided option view
    const callData = { strike: 24850, ltp: 106.15, change: -0.14, color: 'text-red-400', buttonColor: 'bg-red-600' };
    const putData = { strike: 24850, ltp: 38.90, change: -46.30, color: 'text-red-400', buttonColor: 'bg-green-600' };

    const TradePanel = ({ type, data }) => (
        <div className="flex-1 min-w-[300px]">
             <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                <span className="text-lg font-bold text-white">{type} 07OCT {data.strike} {type === 'Call' ? 'CE' : 'PE'}</span>
                <span className={`text-sm font-medium ${data.color}`}>{data.change}%</span>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-48 bg-gray-900 rounded-lg grid place-items-center text-xs text-gray-600 mb-4">
                {type} Side Chart (TradingView Integration)
            </div>

            <div className="text-center mb-4">
                <p className="text-2xl font-bold text-white">LTP: {data.ltp}</p>
            </div>

            {/* Order Placement Buttons */}
            <div className="grid grid-cols-2 gap-3">
                <button className={`bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-xl transition-transform transform hover:scale-[1.02]`}>
                    Sell {type}
                </button>
                <button className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-xl transition-transform transform hover:scale-[1.02]`}>
                    Buy {type}
                </button>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
                <span className="text-red-400">Cancel orders</span>
                <span className="text-blue-400">Intraday / CNC</span>
            </div>
        </div>
    );

    return (
        <div className="mt-6">
            <h2 className="text-3xl font-bold text-white mb-4">Scalper Terminal</h2>
            <div className="glass-card p-6 rounded-xl">
                {/* Global Controls */}
                <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg mb-6 text-sm">
                    <div className="flex gap-4">
                        <select className="bg-gray-700 rounded p-1">
                            <option>NIFTY</option>
                            <option>BANKNIFTY</option>
                        </select>
                        <select className="bg-gray-700 rounded p-1">
                            <option>07 OCT</option>
                            <option>14 OCT</option>
                        </select>
                        <div className="text-green-400 font-bold">NIFTY @ 24894.25 (+0.23%)</div>
                    </div>
                    <button className="bg-blue-600 px-3 py-1 rounded text-white text-xs">Show Chain</button>
                </div>

                {/* Dual Trading Panel */}
                <div className="flex flex-wrap lg:flex-nowrap gap-6">
                    <TradePanel type="Call" data={callData} />
                    <TradePanel type="Put" data={putData} />
                </div>
                
                {/* P&L and Metrics Footer */}
                <div className="mt-6 pt-4 border-t border-gray-800 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-400">Scalper Overall P&L</p>
                        <p className="text-xl font-mono font-bold text-green-400">₹ +1,500.25</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Template P&L</p>
                        <p className="text-xl font-mono font-bold text-red-400">₹ -320.10</p>
                    </div>
                    <div>
                         <p className="text-sm text-gray-400">Open Positions</p>
                        <p className="text-xl font-mono font-bold text-white">4 Lots</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Existing Pages (Slightly modified) ---

const DashboardPage = () => {
    const [selectedIndex, setSelectedIndex] = useState('NIFTY 50');
    return (
        <>
            <div className="mt-6">
                <MarketOverview indices={mockIndices} onSelect={setSelectedIndex} selectedIndex={selectedIndex} />
            </div>
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <TradingChart symbol={selectedIndex} />
                    <PositionsPanel positions={mockPositions} />
                </div>
                <div className="space-y-6">
                    <AiSignalCard suggestion={mockAiSuggestion} />
                    <PortfolioSummary portfolio={mockPortfolio} />
                    <AiAnalysisPanel analysis={mockAiAnalysis} />
                    <WatchlistPanel watchlist={mockWatchlist} trades={mockRecentTrades} />
                </div>
            </div>
        </>
    );
};

const OptionChainPage = () => (
  <div className="mt-6">
    <h2 className="text-3xl font-bold text-white mb-4">Detailed Option Chain</h2>
    <div className="glass-card p-4 rounded-xl h-[700px] grid place-items-center">
      <p className="text-center text-gray-500">The full Option Chain table (CE/PE/IV/OI/Greeks) will be displayed here.</p>
    </div>
  </div>
);

const TradeTabPanel = ({ data, type }) => {
    const headers = {
        positions: ['Contract', 'Qty', 'Avg. Price', 'LTP', 'P&L (MTM)'],
        orders: ['Time', 'Contract', 'Qty', 'Type', 'Price', 'Status'],
    };

    const currentHeaders = type === 'positions' ? headers.positions : headers.orders;
    
    return (
        <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead>
                    <tr className="text-gray-500 border-b border-gray-800">
                        {currentHeaders.map(h => <th key={h} className="p-2 font-medium">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors">
                            {type === 'positions' && (
                                <>
                                    <td className="p-2 font-semibold text-white">{item.name} <span className="text-xs text-gray-500">({item.type})</span></td>
                                    <td className="p-2">{item.qty}</td>
                                    <td className="p-2">{item.avg.toFixed(2)}</td>
                                    <td className="p-2">{item.ltp.toFixed(2)}</td>
                                    <td className={`p-2 font-semibold ${item.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.pnl.toFixed(2)}
                                    </td>
                                </>
                            )}
                            {type === 'orders' && (
                                <>
                                    <td className="p-2 text-gray-400">{item.time}</td>
                                    <td className="p-2 font-semibold text-white">{item.contract}</td>
                                    <td className="p-2">{item.qty}</td>
                                    <td className="p-2 text-blue-400">{item.type}</td>
                                    <td className="p-2">{item.price.toFixed(2)}</td>
                                    <td className={`p-2 font-bold ${item.status === 'EXECUTED' ? 'text-green-400' : item.status === 'OPEN' ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {item.status}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && <p className="text-center text-gray-500 p-4">No {type === 'positions' ? 'open positions' : 'orders'} found.</p>}
        </div>
    )
}

const OneTouchTradePage = () => {
  const [instrument, setInstrument] = useState('NIFTY');
  const [product, setProduct] = useState('MIS');
  const [strikeType, setStrikeType] = useState('ATM'); // ATM, ITM, OTM, Custom
  const [optionType, setOptionType] = useState('CE');
  const [orderType, setOrderType] = useState('MARKET');
  const [strategy, setStrategy] = useState('NORMAL'); // NORMAL, BRACKET, COVER
  const [activeTab, setActiveTab] = useState('Positions');
  // FIX: Added missing state variables for expiry and quantity
  const [expiry, setExpiry] = useState('2025-10-10'); 
  const [quantity, setQuantity] = useState(1);       

  const isLimitOrder = orderType === 'LIMIT';
  const isComplexStrategy = strategy === 'BRACKET' || strategy === 'COVER';
  
  const renderTabContent = () => {
    switch (activeTab) {
        case 'Positions':
            return <TradeTabPanel data={positionsData} type="positions" />;
        case 'Order Book':
            return <TradeTabPanel data={orderBookData} type="orders" />;
        case 'Trade Book':
            return <p className="text-gray-500 p-4">Trade Book data will appear here.</p>;
        case 'Holdings':
            return <p className="text-gray-500 p-4">Equity and F&O Holdings summary here.</p>;
        case 'Funds':
            return <p className="text-gray-500 p-4">Fund details and margin utilization here.</p>;
        default:
            return null;
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-3xl font-bold text-white mb-4">One-Touch Trade Execution</h2>
      <div className="glass-card p-6 rounded-xl">
        {/* --- Top Control Panel (Responsive 2-5 Column Grid) --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 text-sm mb-6">
            
            {/* 1. Broker */}
            <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-400 mb-1">Broker</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" defaultValue="Zerodha">
                    <option>Zerodha</option>
                    <option>Upstox</option>
                    <option>Finvasia</option>
                </select>
            </div>
            
            {/* 2. Instrument */}
            <div>
                <label className="block text-gray-400 mb-1">Instrument</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" value={instrument} onChange={(e) => setInstrument(e.target.value)}>
                    <option>NIFTY</option>
                    <option>BANKNIFTY</option>
                    <option>FINNIFTY</option>
                </select>
            </div>
            
            {/* 3. Product */}
            <div>
                <label className="block text-gray-400 mb-1">Product</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" value={product} onChange={(e) => setProduct(e.target.value)}>
                    <option>MIS</option>
                    <option>NRML</option>
                </select>
            </div>

            {/* 4. Strategy */}
            <div>
                <label className="block text-gray-400 mb-1">Strategy</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" value={strategy} onChange={(e) => setStrategy(e.target.value)}>
                    <option value="NORMAL">Normal</option>
                    <option value="BRACKET">Bracket (BO)</option>
                    <option value="COVER">Cover (CO)</option>
                </select>
            </div>

            {/* 5. Order Type */}
            <div>
                <label className="block text-gray-400 mb-1">Order Type</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                    <option value="MARKET">MARKET</option>
                    <option value="LIMIT">LIMIT</option>
                </select>
            </div>
            
            {/* 6. Option Type */}
            <div>
                <label className="block text-gray-400 mb-1">Option Type</label>
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" value={optionType} onChange={(e) => setOptionType(e.target.value)}>
                    <option value="CE">CE (Call)</option>
                    <option value="PE">PE (Put)</option>
                </select>
            </div>

            {/* 7. Expiry Date */}
            <div>
                <label className="block text-gray-400 mb-1">Expiry Date</label>
                {/* FIX: Using 'expiry' state here */}
                <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" value={expiry} onChange={(e) => setExpiry(e.target.value)}>
                    <option value="2025-10-10">10 Oct 2025</option>
                    <option value="2025-10-17">17 Oct 2025</option>
                    <option value="2025-10-24">24 Oct 2025</option>
                </select>
            </div>

            {/* 8. Strike Price Selector/Input */}
            <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-400 mb-1">Strike Price</label>
                <div className="flex gap-1">
                    <select className="w-1/3 bg-gray-900 border border-gray-700 rounded-l-md p-2 text-white" value={strikeType} onChange={(e) => setStrikeType(e.target.value)}>
                        <option value="ATM">ATM</option>
                        <option value="ITM">ITM</option>
                        <option value="OTM">OTM</option>
                        <option value="Custom">Custom</option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="18500"
                        disabled={strikeType !== 'Custom'}
                        className={`w-2/3 bg-gray-900 border border-gray-700 ${strikeType !== 'Custom' ? 'bg-gray-800 text-gray-500' : 'text-white'} rounded-r-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                </div>
            </div>

            {/* 9. Quantity (Lots) */}
            <div>
               <label className="block text-gray-400 mb-1">Qty (Lots)</label>
               {/* FIX: Using 'quantity' state here */}
               <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* 10. Price (Visible only for LIMIT order) */}
            {isLimitOrder ? (
                <div>
                    <label className="block text-gray-400 mb-1">Limit Price</label>
                    <input type="number" placeholder="0.00" className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
            ) : (
                 <div className="hidden lg:block"></div> // Placeholder for layout alignment on large screens
            )}

            {/* 11. Target (Visible for Bracket/Cover) */}
            {isComplexStrategy && (
                <div>
                    <label className="block text-gray-400 mb-1">Target</label>
                    <input type="number" placeholder="50.00" className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
            )}
             
            {/* 12. SL Trigger (Visible for Bracket/Cover) */}
            {isComplexStrategy && (
                <div>
                    <label className="block text-gray-400 mb-1">SL Trigger</label>
                    <input type="number" placeholder="20.00" className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
            )}
            
            {/* 13. Trail SL (Visible for Bracket) */}
            {strategy === 'BRACKET' && (
                <div>
                    <label className="block text-gray-400 mb-1">Trail SL</label>
                    <input type="number" placeholder="5.00" className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
            )}
            
             {/* Dynamic Empty Space for Alignment */}
            {isComplexStrategy && strategy === 'COVER' && <div className="hidden xl:block"></div>}
        </div>
        
        {/* --- Center Execution Panel --- */}
        <div className="border border-gray-700 p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg flex-wrap">
                <div className="flex items-center gap-4">
                    <p className="font-bold text-xl text-red-400">NIFTY 251028 CE</p>
                    <p className="text-sm">LTP: 798.80 <span className="text-green-400">(77.85 / 10.80%)</span></p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md shadow-lg">Sell Call</button>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md shadow-lg">Buy Call</button>
                </div>
            </div>
            
            <div className="text-center my-4">
                <p className="text-3xl font-extrabold text-white">55589.25 <span className="text-green-400 text-sm font-semibold">(241.30 / 0.44%)</span></p>
                <p className="text-xs text-gray-400">NIFTY BANK Current Price</p>
                <div className="flex justify-center gap-4 mt-3 flex-wrap">
                    <button className="bg-gray-700 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors text-sm">Close All Positions / F6</button>
                    <button className="bg-gray-700 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors text-sm">Cancel All Orders / F7</button>
                </div>
            </div>
            
            <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg flex-wrap-reverse">
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md shadow-lg">Buy Put</button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md shadow-lg">Sell Put</button>
                </div>
                <div className="flex items-center gap-4 text-right">
                    <p className="text-sm">LTP: 441.00 <span className="text-red-400">(-128.75 / -22.60%)</span></p>
                    <p className="font-bold text-xl text-green-400">BANKNIFTY 251028 PE</p>
                </div>
            </div>
        </div>
        
        {/* --- Bottom Tabs Panel --- */}
        <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-3">Trade Summary</h3>
            <div className="flex border-b border-gray-800 mb-4 text-sm overflow-x-auto">
                {['Positions', 'Order Book', 'Trade Book', 'Holdings', 'Funds'].map(tab => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-4 font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-500 hover:text-white'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="bg-gray-900 rounded-lg">
                {renderTabContent()}
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Small Utility Components (Refactored to multi-line to fix whitespace nesting errors) ---

const AiSignalCard = ({ suggestion }) => (
    <div className="glass-card p-4 rounded-xl">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
                <icons.Zap className="w-5 h-5 mr-2 text-yellow-400"/> AI Trading Signal
            </h2>
            <span className="text-xs font-bold text-green-400 bg-green-900/50 px-2 py-1 rounded-md">
                {suggestion.confidence}
            </span>
        </div>
        <div className="bg-gray-900 p-3 rounded-lg">
            <p className="font-bold text-xl text-white">{suggestion.instrument}</p>
            <p className="text-sm text-blue-400">{suggestion.strategy}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center my-4">
            <div>
                <p className="text-sm text-gray-400">Entry</p>
                <p className="font-mono font-bold text-white">{suggestion.entry.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400">Target</p>
                <p className="font-mono font-bold text-green-400">{suggestion.target.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400">Stop-Loss</p>
                <p className="font-mono font-bold text-red-400">{suggestion.stopLoss.toFixed(2)}</p>
            </div>
        </div>
        <p className="text-xs text-gray-400 mb-4">{suggestion.rationale}</p>
        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <icons.Zap className="w-5 h-5" /> Buy 1 Lot (One-Click)
        </button>
    </div>
);

const MarketOverview = ({ indices, onSelect, selectedIndex }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map(index => {
            const isSelected = selectedIndex === index.symbol;
            return (
                <div 
                    key={index.symbol} 
                    onClick={() => onSelect(index.symbol)} 
                    className={`glass-card p-4 rounded-xl cursor-pointer transition-all duration-300 ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-800 hover:border-gray-600'}`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-white">{index.symbol}</p>
                            <p className={`text-2xl font-mono font-bold mt-2 ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {index.price.toFixed(2)}
                            </p>
                            <p className={`text-sm font-semibold ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                            </p>
                        </div>
                        <div className="w-24 h-12">
                            <svg viewBox="0 0 100 40">
                                <path 
                                    d={`M0 ${30 - index.chartData[0]*2} L 16.6 ${30 - index.chartData[1]*2} L 33.2 ${30 - index.chartData[2]*2} L 49.8 ${30 - index.chartData[3]*2} L 66.4 ${30 - index.chartData[4]*2} L 83 ${30 - index.chartData[5]*2} L 100 ${30 - index.chartData[6]*2}`} 
                                    fill="none" 
                                    stroke={index.change >= 0 ? '#4ade80' : '#f87171'} 
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
);

const TradingChart = ({ symbol }) => (
    <div className="glass-card p-4 rounded-xl h-[500px] mb-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Chart: {symbol}</h2>
            <div className="flex items-center gap-2 text-sm">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow-md">1D</button>
                <button className="px-3 py-1 bg-gray-900 rounded-lg text-gray-400 hover:bg-gray-700/50">5D</button>
                <button className="px-3 py-1 bg-gray-900 rounded-lg text-gray-400 hover:bg-gray-700/50">1M</button>
            </div>
        </div>
        <div className="w-full h-[calc(100%-40px)] bg-gray-900 rounded grid place-items-center">
            <p className="text-gray-600">TradingView Chart Library Would Be Integrated Here</p>
        </div>
    </div>
);

const PositionsPanel = ({ positions }) => {
    const totalPL = positions.reduce((acc, pos) => acc + (pos.ltp - pos.avg) * pos.qty, 0);
    return (
        <div className="glass-card p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Open Positions ({positions.length})</h2>
                <div>
                    <span className="text-sm text-gray-400">Total MTM P&L: </span>
                    <span className={`font-semibold ${totalPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {totalPL.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b border-gray-800">
                            <th className="p-2">Contract</th>
                            <th className="p-2">Qty</th>
                            <th className="p-2">Avg.</th>
                            <th className="p-2">LTP</th>
                            <th className="p-2">P&L</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map(pos => {
                            const pnl = (pos.ltp - pos.avg) * pos.qty;
                            return (
                                <tr key={pos.contract} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors">
                                    <td className="p-2 font-semibold text-white">{pos.contract}</td>
                                    <td className="p-2">{pos.qty}</td>
                                    <td className="p-2">{pos.avg.toFixed(2)}</td>
                                    <td className="p-2">{pos.ltp.toFixed(2)}</td>
                                    <td className={`p-2 font-semibold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {pnl.toFixed(2)}
                                    </td>
                                    <td className="p-2"><button className="text-xs bg-red-600/50 hover:bg-red-600 px-3 py-1 rounded">Exit</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PortfolioSummary = ({ portfolio }) => (
    <div className="glass-card p-4 rounded-xl">
        <h2 className="text-lg font-semibold text-white">Portfolio Value</h2>
        <p className="text-3xl font-bold text-white mt-2">₹{portfolio.totalValue.toLocaleString('en-IN')}</p>
        <div className="w-full h-24 mt-4">
            <svg viewBox="0 0 200 80">
                <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <path 
                    d="M0 60 L 50 50 L 100 40 L 150 50 L 200 30" 
                    fill="url(#portfolioGradient)" 
                    stroke="#2563eb" 
                    strokeWidth="2"
                />
            </svg>
        </div>
        <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-400">Realized P&L</span>
                <span className="font-semibold text-green-400">+{portfolio.realizedPL.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Unrealized P&L</span>
                <span className={`font-semibold ${portfolio.unrealizedPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {portfolio.unrealizedPL.toFixed(2)}
                </span>
            </div>
        </div>
    </div>
);

const AiAnalysisPanel = ({ analysis }) => (
    <div className="glass-card p-4 rounded-xl">
        <h2 className="text-lg font-semibold text-white">AI/Quant Analysis</h2>
        <div className="flex justify-around text-center my-4">
            <div>
                <p className="text-sm text-gray-400">Sentiment</p>
                <p className="font-bold text-blue-400">{analysis.sentiment}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400">PCR</p>
                <p className="font-bold text-white">{analysis.pcr}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400">Max Pain</p>
                <p className="font-bold text-white">{analysis.maxPain}</p>
            </div>
        </div>
        <p className="text-xs text-gray-400 bg-gray-900 p-2 rounded-md">{analysis.summary}</p>
    </div>
);

const WatchlistPanel = ({ watchlist, trades }) => {
    const [activeTab, setActiveTab] = useState('watchlist');
    return (
        <div className="glass-card p-4 rounded-xl">
            <div className="flex border-b border-gray-800 mb-2">
                <button 
                    onClick={() => setActiveTab('watchlist')} 
                    className={`pb-2 px-4 text-sm font-semibold ${activeTab === 'watchlist' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500'}`}
                >
                    Watchlist
                </button>
                <button 
                    onClick={() => setActiveTab('trades')} 
                    className={`pb-2 px-4 text-sm font-semibold ${activeTab === 'trades' ? 'text-white border-b-2 border-blue-500' : 'text-gray-500'}`}
                >
                    Recent Trades
                </button>
            </div>
            <div className="text-sm space-y-2">
                {activeTab === 'watchlist' && watchlist.map(item => (
                    <div key={item} className="flex justify-between p-1 hover:bg-gray-800/50 rounded-md cursor-pointer">
                        <span className="font-semibold text-white">{item}</span>
                        <span className="text-gray-400">--</span>
                    </div>
                ))}
                {activeTab === 'trades' && trades.map((trade, i) => (
                    <div key={i} className="flex justify-between p-1 hover:bg-gray-800/50 rounded-md cursor-pointer">
                        <div>
                            <span className={`font-bold ${trade.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>{trade.type} </span>
                            <span className="text-white">{trade.contract}</span>
                        </div>
                        <span className="text-gray-400">@{trade.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// The custom styling for the glass-card effect, as requested by the original file's comments
const StyleInjector = () => (
    <style jsx="true">{`
        .glass-card {
            background: rgba(22, 27, 34, 0.6);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(56, 62, 70, 0.5);
        }
    `}</style>
);
