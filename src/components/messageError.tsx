interface MessageErrorProps {
    message: string
}

export default function MessageError({ message }: MessageErrorProps) {
    return ( 
        <div className="w-full text-center">
            <strong className="text-sm text-red-500">{message}</strong>
        </div>
    )    
};
