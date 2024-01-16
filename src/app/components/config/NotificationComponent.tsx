import { useContext } from 'react';
import { Notification } from "@/app/data/types";

import { BoardContext } from '@/app/components/BoardContext';

export default function NotificationComponent() {

    const boardContext = useContext(BoardContext);
    const notice: any = boardContext.boardSettings.notice;

    if (notice != null) {
        return (
            <div className={`notificationBar-${notice.type}`}>
                {notice.message}
            </div>
        );    
    }else {
        return (
            <></>
        );    

    }

}