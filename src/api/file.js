export function deleteFile(fids) {
  return http.post('/file/delete', { fids })
}
