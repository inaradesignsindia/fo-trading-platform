import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ 
    symbol = 'NSE:NIFTY', 
    interval = 'D',
    theme = 'dark',
    style = '1',
    locale = 'en',
    toolbar_bg = '#161B22',
    enable_publishing = false,
    hide_top_toolbar = false,
    hide_legend = false,
    save_image = false,
    container_id = 'tradingview_widget',
    autosize = true,
    height = '400',
    width = '100%',
    isPremium = false // This will determine which features to enable
}) => {
    const containerRef = useRef();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        
        const config = {
            autosize,
            height,
            width,
            symbol,
            interval,
            timezone: 'Etc/UTC',
            theme,
            style,
            locale,
            toolbar_bg,
            enable_publishing,
            hide_top_toolbar,
            hide_legend,
            save_image,
            container_id
        };

        // Premium features
        if (isPremium) {
            config.allow_symbol_change = true;
            config.watchlist = [
                'NSE:NIFTY',
                'NSE:BANKNIFTY',
                'NSE:FINNIFTY'
            ];
            config.details = true;
            config.hotlist = true;
            config.calendar = true;
            config.studies = [
                'RSI@tv-basicstudies',
                'MACD@tv-basicstudies',
                'BB@tv-basicstudies'
            ];
        } else {
            // Free version limitations
            config.allow_symbol_change = false;
            config.hide_top_toolbar = true;
            config.hide_legend = true;
            config.save_image = false;
            config.details = false;
            config.hotlist = false;
            config.calendar = false;
        }

        script.innerHTML = JSON.stringify(config);
        
        if (containerRef.current) {
            containerRef.current.appendChild(script);
        }

        return () => {
            if (containerRef.current && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [symbol, interval, theme, isPremium]);

    return (
        <div className="tradingview-widget-container">
            <div 
                ref={containerRef} 
                className="tradingview-widget"
                style={{ height: autosize ? '400px' : height }}
            />
            <div className="tradingview-widget-copyright">
                <a 
                    href={`https://www.tradingview.com/symbols/${symbol}/`} 
                    rel="noopener" 
                    target="_blank"
                    className="text-xs text-gray-500 hover:text-blue-500"
                >
                    <span>Charts by TradingView</span>
                </a>
                {!isPremium && (
                    <span className="ml-2 text-xs text-yellow-500">
                        • Free Version (Limited Features)
                    </span>
                )}
            </div>
        </div>
    );
};

// Alternative free charting solution using Lightweight Charts
const LightweightChartsWidget = ({ 
    symbol = 'NIFTY', 
    height = 400,
    theme = 'dark' 
}) => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js';
        script.onload = () => {
            if (window.LightweightCharts && chartContainerRef.current) {
                const chart = window.LightweightCharts.createChart(chartContainerRef.current, {
                    width: chartContainerRef.current.clientWidth,
                    height: height,
                    layout: {
                        backgroundColor: theme === 'dark' ? '#161B22' : '#ffffff',
                        textColor: theme === 'dark' ? '#d1d5db' : '#000000',
                    },
                    grid: {
                        vertLines: {
                            color: theme === 'dark' ? '#374151' : '#f0f0f0',
                        },
                        horzLines: {
                            color: theme === 'dark' ? '#374151' : '#f0f0f0',
                        },
                    },
                    crosshair: {
                        mode: window.LightweightCharts.CrosshairMode.Normal,
                    },
                    rightPriceScale: {
                        borderColor: theme === 'dark' ? '#4b5563' : '#cccccc',
                    },
                    timeScale: {
                        borderColor: theme === 'dark' ? '#4b5563' : '#cccccc',
                    },
                });

                const candlestickSeries = chart.addCandlestickSeries({
                    upColor: '#10b981',
                    downColor: '#ef4444',
                    borderDownColor: '#ef4444',
                    borderUpColor: '#10b981',
                    wickDownColor: '#ef4444',
                    wickUpColor: '#10b981',
                });

                // Sample data - in real app, this would come from API
                const sampleData = [
                    { time: '2023-01-01', open: 18400, high: 18500, low: 18350, close: 18450 },
                    { time: '2023-01-02', open: 18450, high: 18550, low: 18400, close: 18520 },
                    { time: '2023-01-03', open: 18520, high: 18600, low: 18480, close: 18590 },
                    // Add more sample data as needed
                ];

                candlestickSeries.setData(sampleData);

                const handleResize = () => {
                    chart.applyOptions({ 
                        width: chartContainerRef.current.clientWidth 
                    });
                };

                window.addEventListener('resize', handleResize);

                return () => {
                    window.removeEventListener('resize', handleResize);
                    chart.remove();
                };
            }
        };
        document.head.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [symbol, height, theme]);

    return (
        <div className="lightweight-charts-container">
            <div ref={chartContainerRef} className="w-full" />
            <div className="text-xs text-gray-500 mt-2">
                Powered by Lightweight Charts (TradingView) • Free & Open Source
            </div>
        </div>
    );
};

export { TradingViewWidget, LightweightChartsWidget };