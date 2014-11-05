def to_slug(name)
  path = name
  path = path.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')

  path
end