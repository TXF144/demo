import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🎉 Tailwind CSS 接入成功！
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">测试样式</h2>
          <p className="text-gray-600 mb-4">
            如果你能看到这个卡片，并且样式美观，说明 Tailwind 已经正常工作。
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200">
            测试按钮
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['bg-red-100', 'bg-green-100', 'bg-purple-100'].map((color) => (
            <div key={color} className={`p-4 rounded ${color} border`}>
              <p className="text-center">网格项</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
