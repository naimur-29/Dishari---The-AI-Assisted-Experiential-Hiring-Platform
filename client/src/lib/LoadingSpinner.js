
const LoadingSpinner = () => {
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
    );
}

export default LoadingSpinner;
