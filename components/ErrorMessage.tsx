export const ErrorMessage = ({ message }: { message: string }) => <div
    data-testid='error-message'
    className='fixed bottom-0 px-4 mb-4 w-full  text-center justify-center items-center left-0 flex items-center'>
    <div className='rounded-full bg-white py-2 px-8 bg-red-500 text-white'>{message}</div>
</div>