export const uploadFile = (req, res) => {
  // compare against schema
  // return if error
  // else uplaod the file

  console.log(req.file);
  res.json(req.file);
};

export const deleteFile = (req, res) => {
  const { fileId } = req.params;
  res.send(`File ID: ${fileId} is now deleted`);
};

export const getFile = (req, res) => {
  const { fileId } = req.params;
  // Mock information
  res.send(
    `File ID: ${fileId}, Size: 16mb, Updated At: Aug 12 2024, Uploaded By: John Cena`
  );
};
