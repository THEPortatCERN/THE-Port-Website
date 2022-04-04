<?php

namespace Drupal\projects_page\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\image\Entity\ImageStyle;

class ProjectTaxonomyService {

  /** @var Drupal\Core\Entity\EntityTypeManagerInterface */
  protected $entity_type_manager;

  /** @var \Drupal\Core\File\FileUrlGeneratorInterface */
  protected $file_url_generator;

  /** @var Drupal\Core\Extension\ModuleHandlerInterface */
  protected $moduleHandler;

  /**
   * Use the image attached to each SDG Taxonomy
   */
  const USE_SDG_TAXONOMY_IMAGE = false;

  public function __construct(EntityTypeManagerInterface $entity_type_manager, FileUrlGeneratorInterface $file_url_generator, ModuleHandlerInterface $moduleHandler) {
    $this->entity_type_manager = $entity_type_manager;
    $this->file_url_generator = $file_url_generator;
    $this->moduleHandler = $moduleHandler;
  }

  /**
   * Get all project attributes.
   */
  public function getAttributes() {
    $terms = $this->entity_type_manager
      ->getStorage('taxonomy_term')
      ->loadByProperties([
        'vid' => 'project_attributes',
      ]);

    $data = [];

    /** @var \Drupal\taxonomy\TermInterface $term */
    foreach ($terms as $term) {
      $data[] = [
        'id' => $term->id(),
        'name' => $term->getName()
      ];
    }

    return $data;
  }

  /**
   * Get all events taxonomy terms.
   */
  public function getEvents() {
    $terms = $this->entity_type_manager
      ->getStorage('taxonomy_term')
      ->loadByProperties([
        'vid' => 'events',
      ]);

    $data = [];

    /** @var \Drupal\taxonomy\TermInterface $term */
    foreach ($terms as $term) {
      $data[] = [
        'id' => $term->id(),
        'name' => $term->getName()
      ];
    }

    return $data;
  }

  /**
   * Get all "Sustainable Development Goals" (SDGs) taxonomy terms.
   */
  public function getSDGs() {
    $terms = $this->entity_type_manager
      ->getStorage('taxonomy_term')
      ->loadByProperties([
        'vid' => 'sustainable_development_goals',
      ]);

    /** @var \Drupal\taxonomy\TermInterface $term */
    $image_style = ImageStyle::load('extra_small');
    $image_base_url = '/' . $this->moduleHandler->getModule('projects_page')->getPath() . '/app/images/';

    $data = [];
    $counter = 1;
    foreach ($terms as $id => $term) {
      $image_src = "";
      $image_alt = "";

      if (self::USE_SDG_TAXONOMY_IMAGE) {
        $field_pictogram_entity = $term->get('field_pictogram')->entity;
        if (!empty($field_pictogram_entity)) {
          if (!empty($field_pictogram_entity->field_media_image)) {
            $image_uri = $field_pictogram_entity->field_media_image->entity->getFileUri();
            $image_src = $image_style->buildUrl($image_uri);
            $image_alt = $field_pictogram_entity->field_media_image->alt;
          } elseif (!empty($field_pictogram_entity->field_media_svg)) {
            $image_uri = $field_pictogram_entity->field_media_svg->entity->getFileUri();
            $image_src = $this->file_url_generator->generateString($image_uri);
            $image_alt = $field_pictogram_entity->field_media_svg->alt;
          }
        }
      } else {
        // Use the images present in the module
        $image_src = $image_base_url . ('sdg' . str_pad($counter++, 2, "0", STR_PAD_LEFT) . '.png');
      }

      $data[] = [
        'id' => $id,
        'name' => $term->getName(),
        'image_src' => $image_src,
        'image_alt' => $image_alt,
      ];
    }

    return $data;
  }
}
