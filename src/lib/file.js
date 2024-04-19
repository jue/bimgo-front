import FileSaver from 'file-saver'

// 将文件夹dir_id和文件file_id提取出来形成数组
export function extractID(arr) {
  const dataArr = {
    dir_ids: [],
    file_ids: [],
  }

  arr.map((item) => {
    return item.dir_name ? dataArr.dir_ids.push(item.dir_id) : item.file_name ? dataArr.file_ids.push(item.file_id) : null
  })

  return dataArr
}

export function getFileInfo(file_path) {
  return http.post('/uffile/file_info', { file_path })
}

export function formatSize(size) {
  if (!size)
    return '0 KB'

  if (size < 1024 * 1024)
    return `${(size / 1024).toFixed(2)} KB`
  else
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
}

export async function downloadFile(file) {
  const { data: res } = await http.post('/uffile/file_info', { file_path: file.file_path })
  if (res.code === 200)
    FileSaver.saveAs(`https://bimgo-files.nipao.com${res.data.file_path}?_upt=${res.data.upt}`, res.data.file_name)
}
