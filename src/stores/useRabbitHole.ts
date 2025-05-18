import type { FileUploaderState } from '@stores/types'
import { apiClient, tryRequest } from '@/config'
import { useNotifications } from '@stores/useNotifications'

export const useRabbitHole = defineStore('rabbitHole', () => {
  const currentState = reactive<FileUploaderState>({
    loading: false
  })

  const { sendNotificationFromJSON } = useNotifications()

  const sendFile = (file: File, agentId: string) => {
    currentState.loading = true
    tryRequest(
      apiClient?.rabbitHole().postFile(file, agentId, file.name),
      `File ${file.name} successfully sent down the rabbit hole!`, 
      'Unable to send the file to the rabbit hole'
    ).then(res => {
      currentState.loading = false
      currentState.data = res.data
      sendNotificationFromJSON(res)
    })
  }

  const sendMemory = (file: File, agentId: string) => {
    currentState.loading = true
    tryRequest(
      apiClient?.rabbitHole().postMemory(file, agentId, file.name),
      'Memories file successfully sent down the rabbit hole!',
      'Unable to send the memories to the rabbit hole'
    ).then(res => {
      currentState.loading = false
      currentState.data = res.data
      sendNotificationFromJSON(res)
    })
  }

  const sendWebsite = (url: string, agentId: string) => {
    currentState.loading = true
    tryRequest(
      apiClient?.rabbitHole().postWeb(url, agentId),
      'Website successfully sent down the rabbit hole',
      'Unable to send the website to the rabbit hole'
    ).then(res => {
      currentState.loading = false
      currentState.data = res.data
      sendNotificationFromJSON(res)
    })
  }

  return {
    currentState,
    sendFile,
    sendWebsite,
    sendMemory
  }
})