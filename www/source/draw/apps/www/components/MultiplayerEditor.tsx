/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { Tldraw, TldrawApp, useFileSystem } from '@tldraw/tldraw'
import { createClient } from '@liveblocks/client'
import { LiveblocksProvider, RoomProvider } from '@liveblocks/react'
import { useAccountHandlers } from 'hooks/useAccountHandlers'
import { styled } from 'styles'
import { useMultiplayerState } from 'hooks/useMultiplayerState'

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY || '',
  throttle: 80,
})

export default function MultiplayerEditor({
  roomId,
  isUser = false,
  isSponsor = false,
}: {
  roomId: string
  isUser: boolean
  isSponsor: boolean
}) {
  return (
    <LiveblocksProvider client={client}>
      <RoomProvider id={roomId} defaultStorageRoot={TldrawApp.defaultDocument}>
        <Editor roomId={roomId} isSponsor={isSponsor} isUser={isUser} />
      </RoomProvider>
    </LiveblocksProvider>
  )
}

// Inner Editor

function Editor({
  roomId,
  isUser,
  isSponsor,
}: {
  roomId: string
  isUser: boolean
  isSponsor: boolean
}) {
  const fileSystemEvents = useFileSystem()
  const { onSignIn, onSignOut } = useAccountHandlers()
  const { error, ...events } = useMultiplayerState(roomId)

  if (error) return <LoadingScreen>Error: {error.message}</LoadingScreen>

  return (
    <div className="tldraw">
      <Tldraw
        autofocus
        showPages={false}
        showSponsorLink={isSponsor}
        onSignIn={isSponsor ? undefined : onSignIn}
        onSignOut={isUser ? onSignOut : undefined}
        {...fileSystemEvents}
        {...events}
      />
    </div>
  )
}

const LoadingScreen = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
