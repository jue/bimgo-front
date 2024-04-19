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
