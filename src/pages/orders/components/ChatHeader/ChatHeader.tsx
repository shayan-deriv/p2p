import { OnlineStatusLabel, UserAvatar } from '@/components';
import { Text, useDevice } from '@deriv-com/ui';
import './ChatHeader.scss';

type TChatHeaderProps = {
    isOnline: boolean;
    lastOnlineTime?: number | null;
    nickname?: string;
};
const ChatHeader = ({ isOnline, lastOnlineTime, nickname }: TChatHeaderProps) => {
    const { isDesktop } = useDevice();
    return (
        <div className='chat-header flex gap-[1.6rem] w-full'>
            <UserAvatar isOnline={isOnline} nickname={nickname ?? ''} showOnlineStatus size={40} />
            <div className='flex flex-col'>
                <Text size={isDesktop ? 'md' : 'lg'} weight='bold'>
                    {nickname}
                </Text>
                <OnlineStatusLabel isOnline={isOnline} lastOnlineTime={lastOnlineTime ?? 0} />
            </div>
        </div>
    );
};

export default ChatHeader;
