export const uploadFile = (req, res) => {
  res.send(`File Uploaded!`);
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
