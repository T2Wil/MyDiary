const handleError = (res, error) => {
  if (error.routine === 'string_to_uuid') {
    res.status(404).json({
      status: res.statusCode,
      error: 'Not Found!',
    });
  }
  if ((Object.keys(error).length === 0)) {
    res.status(404).json({
      status: res.statusCode,
      error: 'Not Found!',
    });
  }
  if (error.routine === '_bt_check_unique') {
    res.status(409).json({
      status: res.statusCode,
      error: 'Duplicates Found!',
    });
  }

  res.status(500).json({
    status: res.statusCode,
    error,
  });
};

export default handleError;
